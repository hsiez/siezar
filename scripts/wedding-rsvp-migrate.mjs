import { createClient } from '@libsql/client';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { loadEnvFile } from './lib/load-env-file.mjs';

loadEnvFile();

const databaseUrl = firstNonEmpty(
  process.env.TURSO_DATABASE_URL,
  process.env.WEDDING_RSVP_DATABASE_URL,
) ?? 'file:.context/wedding-rsvp.db';

if (databaseUrl.startsWith('file:')) {
  mkdirSync(dirname(databaseUrl.replace(/^file:/, '')), { recursive: true });
}

const db = createClient({
  url: databaseUrl,
  authToken: firstNonEmpty(process.env.TURSO_AUTH_TOKEN, process.env.WEDDING_RSVP_AUTH_TOKEN),
  timeout: 5000,
});

const statements = [
  `CREATE TABLE IF NOT EXISTS reservations (
    id TEXT PRIMARY KEY,
    source_number TEXT,
    household_name TEXT NOT NULL,
    mailing_address TEXT,
    delivery_method TEXT NOT NULL DEFAULT 'mail',
    delivery_notes TEXT,
    rsvp_status TEXT NOT NULL DEFAULT 'pending'
      CHECK (rsvp_status IN ('pending', 'submitted')),
    submitted_at TEXT,
    updated_at TEXT,
    admin_notes TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS reservation_phones (
    id TEXT PRIMARY KEY,
    reservation_id TEXT NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    phone_e164 TEXT NOT NULL UNIQUE,
    label TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (reservation_id, phone_e164)
  )`,
  `CREATE TABLE IF NOT EXISTS reservation_people (
    id TEXT PRIMARY KEY,
    reservation_id TEXT NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    name_editable INTEGER NOT NULL DEFAULT 0 CHECK (name_editable IN (0, 1)),
    rsvp_status TEXT NOT NULL DEFAULT 'pending'
      CHECK (rsvp_status IN ('pending', 'attending', 'declined')),
    meal_choice TEXT,
    vegetarian_meal INTEGER NOT NULL DEFAULT 0 CHECK (vegetarian_meal IN (0, 1)),
    nut_allergy INTEGER NOT NULL DEFAULT 0 CHECK (nut_allergy IN (0, 1)),
    dietary_notes TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT,
    UNIQUE (reservation_id, sort_order)
  )`,
  `CREATE TABLE IF NOT EXISTS rsvp_events (
    id TEXT PRIMARY KEY,
    reservation_id TEXT NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    submitted_by_phone_e164 TEXT,
    submitted_at TEXT NOT NULL,
    payload_json TEXT NOT NULL
  )`,
  'CREATE INDEX IF NOT EXISTS idx_reservation_phones_phone ON reservation_phones(phone_e164)',
  'CREATE INDEX IF NOT EXISTS idx_reservation_people_reservation ON reservation_people(reservation_id, sort_order)',
  'CREATE INDEX IF NOT EXISTS idx_rsvp_events_reservation ON rsvp_events(reservation_id, submitted_at)',
];

const alterStatements = [
  'ALTER TABLE reservation_people ADD COLUMN vegetarian_meal INTEGER NOT NULL DEFAULT 0 CHECK (vegetarian_meal IN (0, 1))',
  'ALTER TABLE reservation_people ADD COLUMN nut_allergy INTEGER NOT NULL DEFAULT 0 CHECK (nut_allergy IN (0, 1))',
];

await db.batch(statements, 'write');

for (const statement of alterStatements) {
  try {
    await db.execute(statement);
  } catch (error) {
    if (!isDuplicateColumnError(error)) {
      throw error;
    }
  }
}

db.close();

console.log(`Migrated RSVP database at ${databaseUrl}`);

function firstNonEmpty(...values) {
  return values.find((value) => value !== undefined && value.trim() !== '');
}

function isDuplicateColumnError(error) {
  return error instanceof Error && error.message.toLowerCase().includes('duplicate column name');
}

