import { createClient, type Client } from '@libsql/client';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const DEFAULT_LOCAL_DATABASE_URL = 'file:.context/wedding-rsvp.db';
const VERCEL_DEVELOPMENT_ENV_FILE = '.vercel/.env.development.local';

let client: Client | undefined;

export function getRsvpDb(): Client {
  if (!client) {
    loadVercelDevelopmentEnvIfNeeded();

    const url = firstNonEmpty(
      process.env.TURSO_DATABASE_URL,
      process.env.WEDDING_RSVP_DATABASE_URL,
    ) ?? DEFAULT_LOCAL_DATABASE_URL;
    const authToken = firstNonEmpty(process.env.TURSO_AUTH_TOKEN, process.env.WEDDING_RSVP_AUTH_TOKEN);

    client = createClient({
      url,
      authToken,
      timeout: 5000,
    });
  }

  return client;
}

function loadVercelDevelopmentEnvIfNeeded() {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  if (firstNonEmpty(process.env.TURSO_DATABASE_URL, process.env.WEDDING_RSVP_DATABASE_URL)) {
    return;
  }

  const envPath = path.join(process.cwd(), VERCEL_DEVELOPMENT_ENV_FILE);
  if (!existsSync(envPath)) {
    return;
  }

  const contents = readFileSync(envPath, 'utf8');
  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    process.env[key] ??= unquoteEnvValue(rawValue.trim());
  }
}

function unquoteEnvValue(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"'))
    || (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  return values.find((value) => value !== undefined && value.trim() !== '');
}
