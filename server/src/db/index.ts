import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.js";

let db: ReturnType<typeof drizzle<typeof schema>> | null = null;
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
    db = drizzle(pool, { schema, mode: "default" });
  } else {
    const connection = await mysql.createConnection(connectionString);
    db = drizzle(connection, { schema, mode: "default" });
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