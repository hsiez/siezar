import type { InStatement, Row } from '@libsql/client';
import { randomUUID } from 'crypto';
import { getRsvpDb } from './db';
import type { SubmitRequest } from './schema';

export type ReservationPerson = {
  id: string;
  displayName: string;
  nameEditable: boolean;
  rsvpStatus: 'pending' | 'attending' | 'declined';
  mealChoice: string | null;
  vegetarianMeal: boolean;
  nutAllergy: boolean;
  dietaryNotes: string | null;
};

export type RsvpReservation = {
  id: string;
  householdName: string;
  rsvpStatus: 'pending' | 'submitted';
  submittedAt: string | null;
  note: string | null;
  people: ReservationPerson[];
};

export type AdminRsvpReservation = RsvpReservation & {
  sourceNumber: string | null;
  mailingAddress: string | null;
  deliveryMethod: string;
  deliveryNotes: string | null;
  adminNotes: string | null;
  phoneNumbers: string[];
};

export class RsvpError extends Error {
  constructor(
    message: string,
    public readonly status = 400,
  ) {
    super(message);
  }
}

export function normalizePhoneToE164(phone: string): string | null {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, '');

  if (trimmed.startsWith('+') && digits.length >= 10 && digits.length <= 15) {
    return `+${digits}`;
  }

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  return null;
}

export async function findReservationByPhone(phone: string): Promise<RsvpReservation | null> {
  const normalizedPhone = normalizePhoneToE164(phone);
  if (!normalizedPhone) {
    throw new RsvpError('Enter a valid phone number.', 400);
  }

  const db = getRsvpDb();
  const reservationResult = await db.execute({
    sql: `SELECT r.id, r.household_name, r.rsvp_status, r.submitted_at, r.guest_note
      FROM reservations r
      INNER JOIN reservation_phones p ON p.reservation_id = r.id
      WHERE p.phone_e164 = ?
      LIMIT 1`,
    args: [normalizedPhone],
  });

  const reservationRow = reservationResult.rows[0];
  if (!reservationRow) {
    return null;
  }

  const peopleResult = await db.execute({
    sql: `SELECT
        id,
        display_name,
        name_editable,
        rsvp_status,
        meal_choice,
        vegetarian_meal,
        nut_allergy,
        dietary_notes
      FROM reservation_people
      WHERE reservation_id = ?
      ORDER BY sort_order ASC, display_name ASC`,
    args: [String(reservationRow.id)],
  });

  return mapReservation(reservationRow, peopleResult.rows);
}

export async function submitReservationRsvp(input: SubmitRequest): Promise<RsvpReservation> {
  const normalizedPhone = normalizePhoneToE164(input.phone);
  if (!normalizedPhone) {
    throw new RsvpError('Enter a valid phone number.', 400);
  }

  const db = getRsvpDb();
  const authorizationResult = await db.execute({
    sql: `SELECT reservation_id
      FROM reservation_phones
      WHERE reservation_id = ? AND phone_e164 = ?
      LIMIT 1`,
    args: [input.reservationId, normalizedPhone],
  });

  if (!authorizationResult.rows[0]) {
    throw new RsvpError('That phone number is not attached to this reservation.', 403);
  }

  const existingPeopleResult = await db.execute({
    sql: `SELECT id, display_name, name_editable
      FROM reservation_people
      WHERE reservation_id = ?`,
    args: [input.reservationId],
  });

  const existingPeople = new Map(
    existingPeopleResult.rows.map((row) => [
      String(row.id),
      {
        displayName: String(row.display_name),
        nameEditable: Number(row.name_editable) === 1,
      },
    ]),
  );

  if (existingPeople.size === 0) {
    throw new RsvpError('Reservation has no people attached.', 404);
  }

  const submittedIds = new Set(input.people.map((person) => person.id));
  if (submittedIds.size !== input.people.length || submittedIds.size !== existingPeople.size) {
    throw new RsvpError('Submit one RSVP answer for every person on the reservation.', 400);
  }

  for (const person of input.people) {
    if (!existingPeople.has(person.id)) {
      throw new RsvpError('Submitted person does not belong to this reservation.', 400);
    }
  }

  const now = new Date().toISOString();
  const statements: InStatement[] = input.people.map((person) => {
    const existingPerson = existingPeople.get(person.id);
    const displayName = existingPerson?.nameEditable
      ? person.displayName?.trim() || existingPerson.displayName
      : existingPerson?.displayName;

    return {
      sql: `UPDATE reservation_people
        SET display_name = ?,
          rsvp_status = ?,
          meal_choice = ?,
          vegetarian_meal = ?,
          nut_allergy = ?,
          dietary_notes = ?,
          updated_at = ?
        WHERE id = ? AND reservation_id = ?`,
      args: [
        displayName ?? person.displayName ?? person.id,
        person.rsvpStatus,
        person.rsvpStatus === 'attending' ? nullIfBlank(person.mealChoice) : null,
        person.rsvpStatus === 'attending' && person.vegetarianMeal ? 1 : 0,
        person.rsvpStatus === 'attending' && person.nutAllergy ? 1 : 0,
        person.rsvpStatus === 'attending' ? nullIfBlank(person.dietaryNotes) : null,
        now,
        person.id,
        input.reservationId,
      ],
    };
  });

  statements.push(
    {
      sql: `UPDATE reservations
        SET rsvp_status = 'submitted',
          submitted_at = COALESCE(submitted_at, ?),
          guest_note = ?,
          updated_at = ?
        WHERE id = ?`,
      args: [now, nullIfBlank(input.note), now, input.reservationId],
    },
    {
      sql: `INSERT INTO rsvp_events (
          id,
          reservation_id,
          submitted_by_phone_e164,
          submitted_at,
          payload_json
        ) VALUES (?, ?, ?, ?, ?)`,
      args: [
        randomUUID(),
        input.reservationId,
        normalizedPhone,
        now,
        JSON.stringify({
          note: nullIfBlank(input.note),
          people: input.people,
        }),
      ],
    },
  );

  await db.batch(statements, 'write');

  const reservation = await findReservationByPhone(normalizedPhone);
  if (!reservation) {
    throw new RsvpError('Reservation could not be loaded after submission.', 500);
  }

  return reservation;
}

export async function listRsvpReservationsForAdmin(): Promise<AdminRsvpReservation[]> {
  const db = getRsvpDb();
  const reservationsResult = await db.execute({
    sql: `SELECT
        id,
        source_number,
        household_name,
        mailing_address,
        delivery_method,
        delivery_notes,
        rsvp_status,
        submitted_at,
        admin_notes,
        guest_note
      FROM reservations
      ORDER BY
        CASE WHEN submitted_at IS NULL THEN 1 ELSE 0 END ASC,
        submitted_at DESC,
        household_name ASC`,
    args: [],
  });

  const peopleResult = await db.execute({
    sql: `SELECT
        id,
        reservation_id,
        display_name,
        name_editable,
        rsvp_status,
        meal_choice,
        vegetarian_meal,
        nut_allergy,
        dietary_notes
      FROM reservation_people
      ORDER BY reservation_id ASC, sort_order ASC, display_name ASC`,
    args: [],
  });

  const phonesResult = await db.execute({
    sql: `SELECT reservation_id, phone_e164
      FROM reservation_phones
      ORDER BY reservation_id ASC, phone_e164 ASC`,
    args: [],
  });

  const peopleByReservation = groupRowsByString(peopleResult.rows, 'reservation_id');
  const phonesByReservation = groupRowsByString(phonesResult.rows, 'reservation_id');

  return reservationsResult.rows.map((row) => {
    const id = String(row.id);
    const reservation = mapReservation(row, peopleByReservation.get(id) ?? []);

    return {
      ...reservation,
      sourceNumber: stringOrNull(row.source_number),
      mailingAddress: stringOrNull(row.mailing_address),
      deliveryMethod: String(row.delivery_method || 'mail'),
      deliveryNotes: stringOrNull(row.delivery_notes),
      adminNotes: stringOrNull(row.admin_notes),
      phoneNumbers: (phonesByReservation.get(id) ?? []).map((phoneRow) => String(phoneRow.phone_e164)),
    };
  });
}

function mapReservation(reservationRow: Row, peopleRows: Row[]): RsvpReservation {
  return {
    id: String(reservationRow.id),
    householdName: String(reservationRow.household_name),
    rsvpStatus: reservationRow.rsvp_status === 'submitted' ? 'submitted' : 'pending',
    submittedAt: stringOrNull(reservationRow.submitted_at),
    note: stringOrNull(reservationRow.guest_note),
    people: peopleRows.map((row) => ({
      id: String(row.id),
      displayName: String(row.display_name),
      nameEditable: Number(row.name_editable) === 1,
      rsvpStatus: normalizeRsvpStatus(row.rsvp_status),
      mealChoice: stringOrNull(row.meal_choice),
      vegetarianMeal: Number(row.vegetarian_meal) === 1,
      nutAllergy: Number(row.nut_allergy) === 1,
      dietaryNotes: stringOrNull(row.dietary_notes),
    })),
  };
}

function groupRowsByString(rows: Row[], key: string): Map<string, Row[]> {
  const groupedRows = new Map<string, Row[]>();

  for (const row of rows) {
    const groupKey = String(row[key]);
    groupedRows.set(groupKey, [...(groupedRows.get(groupKey) ?? []), row]);
  }

  return groupedRows;
}

function normalizeRsvpStatus(value: unknown): ReservationPerson['rsvpStatus'] {
  if (value === 'attending' || value === 'declined') {
    return value;
  }

  return 'pending';
}

function stringOrNull(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

function nullIfBlank(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}
