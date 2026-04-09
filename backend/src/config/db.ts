import { Pool } from 'pg';

import { env } from './env';

export const db = new Pool({
  connectionString: env.databaseUrl,
});

export async function checkDatabaseConnection() {
  const client = await db.connect();

  try {
    const result = await client.query('SELECT NOW() AS now');
    return result.rows[0];
  } finally {
    client.release();
  }
}
