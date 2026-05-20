import { z } from "zod";
import { publicProcedure, router } from "../trpc/index.js";
import { schema, getDb } from "../db/index.js";
import { eq, and } from "drizzle-orm";

export const publicRouter = router({
  // Get all services
  getServices: publicProcedure.query(async () => {
    const db = getDb();
    const result = await db
      .select()
      .from(schema.services)
      .where(eq(schema.services.isActive, true))
      .orderBy(schema.services.orderIndex);
    return result;
  }),

  // Get all FAQs
  getFAQs: publicProcedure.query(async () => {
    const db = getDb();
    const result = await db
      .select()
      .from(schema.faqs)
      .where(eq(schema.faqs.isActive, true))
      .orderBy(schema.faqs.orderIndex);
    return result;
  }),

  // Get testimonials
  getTestimonials: publicProcedure.query(async () => {
    const db = getDb();
    const result = await db
      .select()
      .from(schema.testimonials)
      .where(eq(schema.testimonials.isActive, true));
    return result;
  }),

  // Get public videos
  getVideos: publicProcedure.query(async () => {
    const db = getDb();
    const result = await db
      .select()
      .from(schema.videos)
      .where(eq(schema.videos.isPublic, true))
      .orderBy(schema.videos.orderIndex);
    return result;
  }),

  // Get bundles
  getBundles: publicProcedure.query(async () => {
    const db = getDb();
    const result = await db
      .select()
      .from(schema.bundles)
      .orderBy(schema.bundles.orderIndex);
    return result;
  }),

  // Get blog posts
  getBlogPosts: publicProcedure.query(async () => {
    const db = getDb();
    const result = await db
      .select()
      .from(schema.blogPosts)
      .where(eq(schema.blogPosts.isPublished, true))
      .orderBy(schema.blogPosts.publishedAt);
    return result;
  }),

  // Get single blog post by slug
  getBlogPost: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(schema.blogPosts)
        .where(
          and(
            eq(schema.blogPosts.slug, input.slug),
            eq(schema.blogPosts.isPublished, true)
          )
        )
        .limit(1);
      return result[0] || null;
    }),

  // Public user registration
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { hashPassword } = await import("../auth/index.js");
      const hashedPassword = await hashPassword(input.password);

      // Check if user already exists
      const existing = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, input.email))
        .limit(1);

      if (existing.length > 0) {
        throw new Error("A user with this email already exists");
      }

      const result = await db
        .insert(schema.users)
        .values({
          name: input.name,
          email: input.email,
          password: hashedPassword,
          role: "user",
          studentApprovalStatus: "pending",
        })
        .$returningId();

      const { generateToken } = await import("../auth/index.js");
      const token = generateToken({
        userId: result[0].id,
        email: input.email,
        role: "user",
        name: input.name,
      });

      return {
        success: true,
        token,
        user: {
          id: result[0].id,
          name: input.name,
          email: input.email,
          role: "user",
          studentApprovalStatus: "pending",
        },
      };
    }),

  // Public login
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { comparePassword, generateToken } = await import("../auth/index.js");

      const result = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, input.email))
        .limit(1);

      if (result.length === 0) {
        throw new Error("Invalid email or password");
      }

      const user = result[0];
      if (!user.password) {
        throw new Error("This account uses OAuth. Please sign in with your provider.");
      }

      const valid = await comparePassword(input.password, user.password);
      if (!valid) {
        throw new Error("Invalid email or password");
      }

      // Update last signed in
      await db
        .update(schema.users)
        .set({ lastSignedIn: new Date() })
        .where(eq(schema.users.id, user.id));

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role as "user" | "admin",
        name: user.name,
      });

      return {
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          studentApprovalStatus: user.studentApprovalStatus,
        },
      };
    }),
});