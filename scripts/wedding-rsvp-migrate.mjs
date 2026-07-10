import { createClient } from '@libsql/client';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { loadEnvFile } from './lib/load-env-file.mjs';
import {
  RSVP_SCHEMA_STATEMENTS,
  RSVP_SCHEMA_ALTER_STATEMENTS,
} from '../lib/wedding/rsvp/schema-sql.mjs';

// mirror the app's db.ts: .env.local first, then the Vercel dev env (which
// holds the Turso credentials) — otherwise this migrates the local file db
// while the app reads the remote one.
loadEnvFile();
loadEnvFile('.vercel/.env.development.local');

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

await db.batch(RSVP_SCHEMA_STATEMENTS, 'write');

for (const statement of RSVP_SCHEMA_ALTER_STATEMENTS) {
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

