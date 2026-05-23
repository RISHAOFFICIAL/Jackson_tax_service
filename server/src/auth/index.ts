import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET environment variable is required in production!");
  }
  console.warn("⚠️  WARNING: Using dev JWT secret. Set JWT_SECRET in .env for production!");
}

const DEV_SECRET = "jackson-tax-service-jwt-secret-dev";

export interface JwtPayload {
  userId: number;
  email: string;
  role: "user" | "admin";
  name: string;
}

const getSecret = () => JWT_SECRET || DEV_SECRET;

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, getSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, getSecret()) as JwtPayload;
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