import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createDbConnection } from "./db/index.js";
import { createContext } from "./trpc/index.js";
import { publicRouter } from "./trpc/routers/public.js";
import { protectedRouter } from "./trpc/routers/protected.js";
import { adminRouter } from "./trpc/routers/admin.js";
import { router } from "./trpc/index.js";
import * as trpcExpress from "@trpc/server/adapters/express";

// Combine all routers
const appRouter = router({
  public: publicRouter,
  protected: protectedRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;

async function main() {
  const port = parseInt(process.env.PORT || "3001");

  // Initialize database
  await createDbConnection();
  console.log("Database connected successfully");

  const app = express();

  // Security Middleware
  // Helmet with CSP configured for production
  const isProd = process.env.NODE_ENV === "production";
  app.use(helmet({
    contentSecurityPolicy: isProd ? {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://www.youtube.com", "https://www.google.com"],
        frameSrc: ["'self'", "https://www.youtube.com", "https://www.google.com"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        connectSrc: ["'self'", "https://ajackstax.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    } : false,
  }));

  // CORS
  app.use(cors({
    origin: isProd
      ? ["https://ajackstax.com", "https://www.ajackstax.com"]
      : ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isProd ? 100 : 1000, // limit each IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
  });
  app.use("/api/", limiter);

  // Stricter rate limit for auth endpoints
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // 10 login/register attempts per 15 min
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many authentication attempts. Please try again later." },
  });

  // Body parsing with size limit (prevents DOS via large payloads)
  app.use(express.json({ limit: "1mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // tRPC middleware - apply auth rate limiting to login/register
  app.use(
    "/api/trpc",
    (req, res, next) => {
      const isAuthRoute = req.body?.procedure?.path === "public.login" || 
                          req.body?.procedure?.path === "public.register";
      if (isAuthRoute) {
        return authLimiter(req, res, next);
      }
      next();
    },
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // Serve static files in production
  if (isProd) {
    app.use(express.static("../client/dist"));
    app.get("*", (_req, res) => {
      res.sendFile("index.html", { root: "../client/dist" });
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Jackson Tax Service API running on http://0.0.0.0:${port}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});