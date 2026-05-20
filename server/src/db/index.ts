import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.js";

let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export async function createDbConnection() {
  const connection = await mysql.createConnection(
    process.env.DATABASE_URL || "mysql://root:password@localhost:3306/jackson_tax_service"
  );
  db = drizzle(connection, { schema, mode: "default" });
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call createDbConnection() first.");
  }
  return db;
}

export { schema };