import { initTRPC, TRPCError } from "@trpc/server";
import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getDb } from "../db/index.js";
import { verifyToken, extractTokenFromHeader, type JwtPayload } from "../auth/index.js";
import type { inferAsyncReturnType } from "@trpc/server";

export async function createContext(opts: FetchCreateContextFnOptions) {
  const db = getDb();

  // Extract token from Authorization header
  const token = extractTokenFromHeader(opts.req.headers.get("authorization") || undefined);
  let user: JwtPayload | null = null;

  if (token) {
    user = verifyToken(token);
  }

  return {
    db,
    user,
    req: opts.req,
    resHeaders: opts.resHeaders,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedure (requires authentication)
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "You must be logged in" });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

// Admin procedure (requires admin role)
export const adminProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "You must be logged in" });
  }
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export { t };
