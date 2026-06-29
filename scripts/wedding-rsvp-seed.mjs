import { createClient } from '@libsql/client';
import { parse } from 'csv-parse/sync';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { loadEnvFile } from './lib/load-env-file.mjs';

loadEnvFile();

const databaseUrl = firstNonEmpty(
  process.env.TURSO_DATABASE_URL,
  process.env.WEDDING_RSVP_DATABASE_URL,
) ?? 'file:.context/wedding-rsvp.db';

const reservationsPath = process.env.RSVP_RESERVATIONS_CSV ?? '.context/rsvp-invitations-seed.csv';
const phonesPath = process.env.RSVP_PHONES_CSV ?? '.context/rsvp-phones-seed.csv';
const peoplePath = process.env.RSVP_PEOPLE_CSV ?? '.context/rsvp-people-seed.csv';

if (databaseUrl.startsWith('file:')) {
  mkdirSync(dirname(databaseUrl.replace(/^file:/, '')), { recursive: true });
}

const db = createClient({
  url: databaseUrl,
  authToken: firstNonEmpty(process.env.TURSO_AUTH_TOKEN, process.env.WEDDING_RSVP_AUTH_TOKEN),
  timeout: 5000,
});

const reservationRows = readCsvIfExists(reservationsPath);
const phoneRows = readCsvIfExists(phonesPath);
const personRows = readCsvIfExists(peoplePath);

const statements = [
  ...reservationRows.map((row) => ({
    sql: `INSERT INTO reservations (
        id,
        source_number,
        household_name,
        mailing_address,
        delivery_method,
        delivery_notes,
        rsvp_status,
        admin_notes
      ) VALUES (?, ?, ?, ?, ?, ?, COALESCE(NULLIF(?, ''), 'pending'), ?)
      ON CONFLICT(id) DO UPDATE SET
        source_number = excluded.source_number,
        household_name = excluded.household_name,
        mailing_address = excluded.mailing_address,
        delivery_method = excluded.delivery_method,
        delivery_notes = excluded.delivery_notes,
        admin_notes = excluded.admin_notes`,
    args: [
      reservationId(row),
      value(row.source_number),
      required(row.household_name, 'household_name'),
      value(row.mailing_address),
      value(row.delivery_method) || 'mail',
      value(row.delivery_notes),
      value(row.rsvp_status) || 'pending',
      value(row.admin_notes),
    ],
  })),
  ...phoneRows.map((row, index) => {
    const phone = normalizePhoneToE164(required(row.phone_e164 ?? row.phone, 'phone_e164'));
    if (!phone) {
      throw new Error(`Invalid phone number in ${phonesPath} row ${index + 2}`);
    }

    return {
      sql: `INSERT INTO reservation_phones (
          id,
          reservation_id,
          phone_e164,
          label
        ) VALUES (?, ?, ?, ?)
        ON CONFLICT(phone_e164) DO UPDATE SET
          reservation_id = excluded.reservation_id,
          label = excluded.label`,
      args: [
        value(row.phone_id) || `PHONE-${phone.replace(/\D/g, '')}`,
        reservationId(row),
        phone,
        value(row.label),
      ],
    };
  }),
  ...personRows.map((row, index) => ({
    sql: `INSERT INTO reservation_people (
        id,
        reservation_id,
        display_name,
        name_editable,
        rsvp_status,
        meal_choice,
        vegetarian_meal,
        nut_allergy,
        dietary_notes,
        sort_order
      ) VALUES (?, ?, ?, ?, COALESCE(NULLIF(?, ''), 'pending'), ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        reservation_id = excluded.reservation_id,
        display_name = excluded.display_name,
        name_editable = excluded.name_editable,
        meal_choice = excluded.meal_choice,
        vegetarian_meal = excluded.vegetarian_meal,
        nut_allergy = excluded.nut_allergy,
        dietary_notes = excluded.dietary_notes,
        sort_order = excluded.sort_order`,
    args: [
      value(row.person_id) || `PERSON-${reservationId(row)}-${index + 1}`,
      reservationId(row),
      required(row.display_name, 'display_name'),
      booleanToInteger(row.name_editable),
      value(row.rsvp_status) || 'pending',
      value(row.meal_choice),
      booleanToInteger(row.vegetarian_meal),
      booleanToInteger(row.nut_allergy),
      value(row.dietary_notes),
      Number(value(row.sort_order) || index + 1),
    ],
  })),
];

if (statements.length === 0) {
  console.log('No RSVP seed CSVs found. Nothing to seed.');
} else {
  await db.batch(statements, 'write');
  console.log(`Seeded ${reservationRows.length} reservations, ${phoneRows.length} phones, ${personRows.length} people.`);
}

db.close();

function readCsvIfExists(path) {
  if (!existsSync(path)) {
    return [];
  }

  return parse(readFileSync(path, 'utf8'), {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
  });
}

function reservationId(row) {
  return required(row.reservation_id ?? row.invitation_id, 'reservation_id');
}

function required(valueToCheck, column) {
  const trimmed = value(valueToCheck);
  if (!trimmed) {
    throw new Error(`Missing required ${column} value.`);
  }

  return trimmed;
}

function value(valueToClean) {
  return typeof valueToClean === 'string' ? valueToClean.trim() : '';
}

function booleanToInteger(valueToConvert) {
  const normalized = value(valueToConvert).toLowerCase();
  return normalized === 'true' || normalized === '1' || normalized === 'yes' ? 1 : 0;
}

function firstNonEmpty(...values) {
  return values.find((valueToCheck) => valueToCheck !== undefined && valueToCheck.trim() !== '');
}

function normalizePhoneToE164(phone) {
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
