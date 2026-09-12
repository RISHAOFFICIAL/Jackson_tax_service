import { drizzle, type MySql2Database } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.js";

// NOTE: drizzle-orm 0.38.x has a type-inference bug where optional (nullable /
// defaulted) columns are omitted from insert/update models, so `tsc` flags
// otherwise-valid `.values({...})` / `.set({...})` calls. We type `db` as
// `MySql2Database<typeof schema>` and add `as any` on affected value objects
// (seed.ts + the tRPC routers). All column names are valid — runtime is unchanged.

let db: MySql2Database<typeof schema> | null = null;
let pool: mysql.Pool | null = null;

export async function createDbConnection() {
  const connectionString = process.env.DATABASE_URL || "mysql://root:password@localhost:3306/jackson_tax_service";

  // Use connection pool for production, simple connection for development
  const isProd = process.env.NODE_ENV === "production";

  if (isProd) {
    pool = mysql.createPool({
      uri: connectionString,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
    db = drizzle(pool, { schema, mode: "default" }) as MySql2Database<typeof schema>;
  } else {
    const connection = await mysql.createConnection(connectionString);
    db = drizzle(connection, { schema, mode: "default" }) as MySql2Database<typeof schema>;
  }

  return db;
}

export function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call createDbConnection() first.");
  }
  return db;
}

export async function closeDbConnection() {
  if (pool) {
    await pool.end();
  }
}

export { schema };