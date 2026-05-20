import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "jackson-tax-service-jwt-secret-dev";

export interface JwtPayload {
  userId: number;
  email: string;
  role: "user" | "admin";
  name: string;
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function extractTokenFromHeader(header?: string): string | null {
  if (!header) return null;
  const parts = header.split(" ");
  if (parts.length === 2 && parts[0] === "Bearer") {
    return parts[1];
  }
  return null;
}