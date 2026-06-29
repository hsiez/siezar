import { createClient, type Client } from '@libsql/client';

const DEFAULT_LOCAL_DATABASE_URL = 'file:.context/wedding-rsvp.db';

let client: Client | undefined;

export function getRsvpDb(): Client {
  if (!client) {
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

function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  return values.find((value) => value !== undefined && value.trim() !== '');
}
