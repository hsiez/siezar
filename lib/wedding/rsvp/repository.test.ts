import type { Client } from '@libsql/client';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

type RepositoryModule = typeof import('./repository');

let db: Client;
let tempDir: string;
let repository: RepositoryModule;

beforeAll(async () => {
  delete process.env.TURSO_DATABASE_URL;
  delete process.env.TURSO_AUTH_TOKEN;

  tempDir = await mkdtemp(path.join(tmpdir(), 'wedding-rsvp-'));
  process.env.WEDDING_RSVP_DATABASE_URL = `file:${path.join(tempDir, 'rsvp.db')}`;

  const dbModule = await import('./db');
  const migrations = await import('./migrations');
  repository = await import('./repository');

  db = dbModule.getRsvpDb();
  await migrations.migrateRsvpDb(db);
  await seedTestData(db);
});

afterAll(async () => {
  db?.close();

  if (tempDir) {
    await rm(tempDir, { force: true, recursive: true });
  }
});

describe('RSVP repository', () => {
  it('normalizes common US phone number formats to E.164', () => {
    expect(repository.normalizePhoneToE164('9095185980')).toBe('+19095185980');
    expect(repository.normalizePhoneToE164('(909) 518-5980')).toBe('+19095185980');
    expect(repository.normalizePhoneToE164('1-909-518-5980')).toBe('+19095185980');
    expect(repository.normalizePhoneToE164('123')).toBeNull();
  });

  it('finds the same reservation through any phone number attached to it', async () => {
    const firstLookup = await repository.findReservationByPhone('9095185980');
    const secondLookup = await repository.findReservationByPhone('(909) 342-2583');

    expect(firstLookup?.id).toBe('INV-001');
    expect(secondLookup?.id).toBe('INV-001');
    expect(firstLookup?.people.map((person) => person.displayName)).toEqual([
      'Paul Dizon',
      'Lisa Dizon',
    ]);
  });

  it('returns null for an unknown valid phone number', async () => {
    await expect(repository.findReservationByPhone('5551234567')).resolves.toBeNull();
  });

  it('lists reservations with admin-only RSVP details', async () => {
    const reservations = await repository.listRsvpReservationsForAdmin();

    expect(reservations).toHaveLength(2);
    expect(reservations[0]).toMatchObject({
      id: 'INV-002',
      householdName: 'Editable Guest Test',
      rsvpStatus: 'pending',
      phoneNumbers: ['+19499225770'],
    });
    expect(reservations[1]).toMatchObject({
      id: 'INV-001',
      householdName: 'Paul & Lisa Dizon',
      rsvpStatus: 'pending',
      phoneNumbers: ['+19093422583', '+19095185980'],
    });
    expect(reservations[1].people.map((person) => person.displayName)).toEqual([
      'Paul Dizon',
      'Lisa Dizon',
    ]);
  });

  it('submits every person on a reservation and logs the event', async () => {
    const reservation = await repository.submitReservationRsvp({
      phone: '9499225770',
      reservationId: 'INV-002',
      people: [
        {
          id: 'PERSON-003',
          rsvpStatus: 'attending',
          vegetarianMeal: true,
          nutAllergy: true,
          dietaryNotes: 'No sesame',
        },
        {
          id: 'PERSON-004',
          displayName: 'Taylor Guest',
          rsvpStatus: 'declined',
          vegetarianMeal: true,
          nutAllergy: true,
          dietaryNotes: 'Should be cleared',
        },
      ],
    });

    expect(reservation.rsvpStatus).toBe('submitted');
    expect(reservation.people).toMatchObject([
      {
        id: 'PERSON-003',
        displayName: 'Named Person',
        rsvpStatus: 'attending',
        vegetarianMeal: true,
        nutAllergy: true,
        dietaryNotes: 'No sesame',
      },
      {
        id: 'PERSON-004',
        displayName: 'Taylor Guest',
        rsvpStatus: 'declined',
        vegetarianMeal: false,
        nutAllergy: false,
        dietaryNotes: null,
      },
    ]);

    const eventCount = await db.execute({
      sql: 'SELECT COUNT(*) AS count FROM rsvp_events WHERE reservation_id = ?',
      args: ['INV-002'],
    });

    expect(eventCount.rows[0].count).toBe(1);
  });

  it('persists an optional household note and returns it on every read', async () => {
    const submitted = await repository.submitReservationRsvp({
      phone: '9095185980',
      reservationId: 'INV-001',
      note: '  Excited to celebrate with you both!  ',
      people: [
        { id: 'PERSON-001', rsvpStatus: 'attending' },
        { id: 'PERSON-002', rsvpStatus: 'declined' },
      ],
    });

    // stored trimmed, surfaced on submit, lookup, and the admin listing
    expect(submitted.note).toBe('Excited to celebrate with you both!');
    const relooked = await repository.findReservationByPhone('9093422583');
    expect(relooked?.note).toBe('Excited to celebrate with you both!');
    const admin = await repository.listRsvpReservationsForAdmin();
    expect(admin.find((reservation) => reservation.id === 'INV-001')?.note).toBe(
      'Excited to celebrate with you both!',
    );
  });

  it('clears the household note when resubmitted blank', async () => {
    const submitted = await repository.submitReservationRsvp({
      phone: '9095185980',
      reservationId: 'INV-001',
      note: '   ',
      people: [
        { id: 'PERSON-001', rsvpStatus: 'attending' },
        { id: 'PERSON-002', rsvpStatus: 'declined' },
      ],
    });

    expect(submitted.note).toBeNull();
  });

  it('rejects partial submissions so stale clients cannot update only some people', async () => {
    await expect(
      repository.submitReservationRsvp({
        phone: '9095185980',
        reservationId: 'INV-001',
        people: [{ id: 'PERSON-001', rsvpStatus: 'attending' }],
      }),
    ).rejects.toMatchObject({
      message: 'Submit one RSVP answer for every person on the reservation.',
      status: 400,
    });
  });
});

async function seedTestData(testDb: Client) {
  await testDb.batch([
    {
      sql: `INSERT INTO reservations (id, household_name, delivery_method)
        VALUES (?, ?, ?)`,
      args: ['INV-001', 'Paul & Lisa Dizon', 'mail'],
    },
    {
      sql: `INSERT INTO reservations (id, household_name, delivery_method)
        VALUES (?, ?, ?)`,
      args: ['INV-002', 'Editable Guest Test', 'mail'],
    },
    {
      sql: `INSERT INTO reservation_phones (id, reservation_id, phone_e164)
        VALUES (?, ?, ?)`,
      args: ['PHONE-001', 'INV-001', '+19095185980'],
    },
    {
      sql: `INSERT INTO reservation_phones (id, reservation_id, phone_e164)
        VALUES (?, ?, ?)`,
      args: ['PHONE-002', 'INV-001', '+19093422583'],
    },
    {
      sql: `INSERT INTO reservation_phones (id, reservation_id, phone_e164)
        VALUES (?, ?, ?)`,
      args: ['PHONE-003', 'INV-002', '+19499225770'],
    },
    {
      sql: `INSERT INTO reservation_people (
          id,
          reservation_id,
          display_name,
          name_editable,
          sort_order
        ) VALUES (?, ?, ?, ?, ?)`,
      args: ['PERSON-001', 'INV-001', 'Paul Dizon', 0, 1],
    },
    {
      sql: `INSERT INTO reservation_people (
          id,
          reservation_id,
          display_name,
          name_editable,
          sort_order
        ) VALUES (?, ?, ?, ?, ?)`,
      args: ['PERSON-002', 'INV-001', 'Lisa Dizon', 0, 2],
    },
    {
      sql: `INSERT INTO reservation_people (
          id,
          reservation_id,
          display_name,
          name_editable,
          sort_order
        ) VALUES (?, ?, ?, ?, ?)`,
      args: ['PERSON-003', 'INV-002', 'Named Person', 0, 1],
    },
    {
      sql: `INSERT INTO reservation_people (
          id,
          reservation_id,
          display_name,
          name_editable,
          sort_order
        ) VALUES (?, ?, ?, ?, ?)`,
      args: ['PERSON-004', 'INV-002', 'Guest', 1, 2],
    },
  ], 'write');
}
