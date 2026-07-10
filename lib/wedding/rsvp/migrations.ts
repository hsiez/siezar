import type { Client } from '@libsql/client';
// Schema SQL lives in a shared plain-ESM module so the migration runner
// (scripts/wedding-rsvp-migrate.mjs) and this typed code can't drift apart.
import { RSVP_SCHEMA_STATEMENTS, RSVP_SCHEMA_ALTER_STATEMENTS } from './schema-sql.mjs';

export { RSVP_SCHEMA_STATEMENTS };

export async function migrateRsvpDb(db: Client): Promise<void> {
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
}

function isDuplicateColumnError(error: unknown): boolean {
  return error instanceof Error && error.message.toLowerCase().includes('duplicate column name');
}
