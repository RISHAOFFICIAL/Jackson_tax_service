import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
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

  // Middleware
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({
    origin: process.env.NODE_ENV === "production"
      ? ["https://ajackstax.com", "https://www.ajackstax.com"]
      : ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }));
  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // tRPC middleware
  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
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