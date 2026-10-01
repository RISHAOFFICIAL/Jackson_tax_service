import { z } from "zod";
import { adminProcedure, router } from "../index.js";
import { schema, getDb } from "../../db/index.js";
import { eq, desc, and, count } from "drizzle-orm";

const videoInputSchema = z.object({
  videoId: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  url: z.string().url(),
  platform: z.string().default("youtube"),
  bundleId: z.string().optional(),
  duration: z.number().optional(),
  thumbnailUrl: z.string().optional(),
  orderIndex: z.number().default(0),
  isPublic: z.boolean().default(false),
});

const quizInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  bundleId: z.string().optional(),
  questions: z.array(z.object({
    question: z.string(),
    options: z.array(z.string()),
    correctAnswer: z.any(),
  })),
  passingScore: z.number().default(70),
});

export const adminRouter = router({
  // === USER MANAGEMENT ===

  // Get all students
  getAllStudents: adminProcedure.query(async () => {
    const db = getDb();
    const result = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.role, "user"))
      .orderBy(desc(schema.users.createdAt));
    return result;
  }),

  // Approve student
  approveStudent: adminProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(schema.users)
        .set({ studentApprovalStatus: "approved" })
        .where(eq(schema.users.id, input.userId));
      return { success: true };
    }),

  // Reject student
  rejectStudent: adminProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(schema.users)
        .set({ studentApprovalStatus: "rejected" })
        .where(eq(schema.users.id, input.userId));
      return { success: true };
    }),

  // === STUDENT PROGRESS ===

  // Get specific student's progress
  getStudentProgress: adminProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();

      const progress = await db
        .select()
        .from(schema.videoProgress)
        .where(eq(schema.videoProgress.userId, input.userId))
        .orderBy(desc(schema.videoProgress.lastWatchedAt));

      const totalVideos = await db
        .select({ count: count() })
        .from(schema.videos);

      const completedVideos = progress.filter((p) => p.completed).length;
      const completionRate = totalVideos[0].count > 0
        ? Math.round((completedVideos / totalVideos[0].count) * 100)
        : 0;

      const bundles = await db
        .select()
        .from(schema.bundleCompletions)
        .where(eq(schema.bundleCompletions.userId, input.userId));

      const certificates = await db
        .select()
        .from(schema.certificates)
        .where(eq(schema.certificates.userId, input.userId));

      const quizResults = await db
        .select()
        .from(schema.quizAnswers)
        .where(eq(schema.quizAnswers.userId, input.userId));

      return {
        progress,
        completedVideos,
        totalVideos: totalVideos[0].count,
        completionRate,
        bundlesCompleted: bundles,
        certificates,
        quizResults,
      };
    }),

  // Get all student progress summary
  getAllStudentsProgress: adminProcedure.query(async () => {
    const db = getDb();
    const students = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.role, "user"));

    const totalVideos = await db
      .select({ count: count() })
      .from(schema.videos);

    const totalVidCount = totalVideos[0].count || 0;

    const result = await Promise.all(
      students.map(async (student) => {
        const completedVids = await db
          .select({ count: count() })
          .from(schema.videoProgress)
          .where(
            and(
              eq(schema.videoProgress.userId, student.id),
              eq(schema.videoProgress.completed, true)
            )
          );

        const certs = await db
          .select({ count: count() })
          .from(schema.certificates)
          .where(eq(schema.certificates.userId, student.id));

        return {
          id: student.id,
          name: student.name,
          email: student.email,
          status: student.studentApprovalStatus,
          completedVideos: completedVids[0].count || 0,
          totalVideos: totalVidCount,
          certificates: certs[0].count || 0,
          lastActive: student.lastSignedIn,
        };
      })
    );

    return result;
  }),

  // === VIDEO MANAGEMENT ===

  // Create video
  createVideo: adminProcedure
    .input(videoInputSchema)
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db
        .insert(schema.videos)
        .values(input as typeof schema.videos.$inferInsert)
        .$returningId();
      return { success: true, id: result[0].id };
    }),

  // Update video
  updateVideo: adminProcedure
    .input(z.object({ videoId: z.string(), data: videoInputSchema.partial() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(schema.videos)
        .set({ ...input.data, updatedAt: new Date() })
        .where(eq(schema.videos.videoId, input.videoId));
      return { success: true };
    }),

  // Delete video
  deleteVideo: adminProcedure
    .input(z.object({ videoId: z.string() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .delete(schema.videos)
        .where(eq(schema.videos.videoId, input.videoId));
      return { success: true };
    }),

  // Get all videos (admin view)
  getAllVideos: adminProcedure.query(async () => {
    const db = getDb();
    const result = await db
      .select()
      .from(schema.videos)
      .orderBy(schema.videos.orderIndex);
    return result;
  }),

  // === BUNDLE MANAGEMENT ===

  // Create bundle
  createBundle: adminProcedure
    .input(z.object({
      bundleId: z.string(),
      name: z.string().min(1),
      description: z.string().optional(),
      thumbnailUrl: z.string().optional(),
      orderIndex: z.number().default(0),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db
        .insert(schema.bundles)
        .values(input as typeof schema.bundles.$inferInsert)
        .$returningId();
      return { success: true, id: result[0].id };
    }),

  // Delete bundle
  deleteBundle: adminProcedure
    .input(z.object({ bundleId: z.string() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .delete(schema.bundles)
        .where(eq(schema.bundles.bundleId, input.bundleId));
      return { success: true };
    }),

  // === QUIZ MANAGEMENT ===

  // Create quiz
  createQuiz: adminProcedure
    .input(quizInputSchema)
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db
        .insert(schema.quizzes)
        .values({
          title: input.title,
          description: input.description,
          bundleId: input.bundleId,
          questions: input.questions as any,
          passingScore: input.passingScore,
        })
        .$returningId();
      return { success: true, id: result[0].id };
    }),

  // Get all quizzes
  getAllQuizzes: adminProcedure.query(async () => {
    const db = getDb();
    const result = await db
      .select()
      .from(schema.quizzes)
      .orderBy(desc(schema.quizzes.createdAt));
    return result;
  }),

  // Get quiz scores
  getQuizScores: adminProcedure
    .input(z.object({ quizId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(schema.quizAnswers)
        .where(eq(schema.quizAnswers.quizId, input.quizId))
        .orderBy(desc(schema.quizAnswers.score));

      // Enrich with user info
      const userIds = [...new Set(result.map((r) => r.userId))];
      const users = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, userIds[0]));

      const userMap = new Map(users.map((u) => [u.id, u.name]));

      return result.map((r) => ({
        ...r,
        userName: userMap.get(r.userId) || "Unknown",
      }));
    }),

  // === COMMENT MODERATION ===

  // Get all comments (for moderation)
  getAllComments: adminProcedure.query(async () => {
    const db = getDb();
    const result = await db
      .select()
      .from(schema.videoComments)
      .orderBy(desc(schema.videoComments.createdAt));

    const userIds = [...new Set(result.map((c) => c.userId))];
    const users = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, userIds[0]));

    const userMap = new Map(users.map((u) => [u.id, u.name]));

    return result.map((comment) => ({
      ...comment,
      userName: userMap.get(comment.userId) || "Unknown",
    }));
  }),

  // Approve comment
  approveComment: adminProcedure
    .input(z.object({ commentId: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(schema.videoComments)
        .set({ approved: true })
        .where(eq(schema.videoComments.id, input.commentId));
      return { success: true };
    }),

  // Delete comment
  deleteComment: adminProcedure
    .input(z.object({ commentId: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .delete(schema.videoComments)
        .where(eq(schema.videoComments.id, input.commentId));
      return { success: true };
    }),

  // === CERTIFICATE MANAGEMENT ===

  // Issue certificate
  issueCertificate: adminProcedure
    .input(z.object({
      userId: z.number(),
      bundleId: z.string(),
      bundleName: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db
        .insert(schema.certificates)
        .values({
          userId: input.userId,
          bundleId: input.bundleId,
          bundleName: input.bundleName,
          certificateUrl: `/certificates/${input.userId}/${input.bundleId}`,
        })
        .$returningId();

      // Also mark bundle as completed
      await db
        .insert(schema.bundleCompletions)
        .values({
          userId: input.userId,
          bundleId: input.bundleId,
          bundleName: input.bundleName,
        });

      return { success: true, id: result[0].id };
    }),

  // Get all certificates
  getAllCertificates: adminProcedure.query(async () => {
    const db = getDb();
    const result = await db
      .select()
      .from(schema.certificates)
      .orderBy(desc(schema.certificates.issuedAt));

    const userIds = [...new Set(result.map((c) => c.userId))];
    const users = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, userIds[0]));

    const userMap = new Map(users.map((u) => [u.id, u.name]));

    return result.map((cert) => ({
      ...cert,
      userName: userMap.get(cert.userId) || "Unknown",
    }));
  }),

  // === CONTENT MANAGEMENT ===

  // Update service
  updateService: adminProcedure
    .input(z.object({
      id: z.number(),
      data: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        icon: z.string().optional(),
        features: z.array(z.string()).optional(),
        pricing: z.string().optional(),
        isActive: z.boolean().optional(),
      }),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(schema.services)
        .set({ ...input.data, updatedAt: new Date() })
        .where(eq(schema.services.id, input.id));
      return { success: true };
    }),

  // Update FAQ
  updateFAQ: adminProcedure
    .input(z.object({
      id: z.number(),
      data: z.object({
        question: z.string().optional(),
        answer: z.string().optional(),
        isActive: z.boolean().optional(),
      }),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(schema.faqs)
        .set({ ...input.data, updatedAt: new Date() })
        .where(eq(schema.faqs.id, input.id));
      return { success: true };
    }),

  // Create blog post
  createBlogPost: adminProcedure
    .input(z.object({
      title: z.string(),
      slug: z.string(),
      excerpt: z.string().optional(),
      content: z.string(),
      author: z.string().optional(),
      coverImage: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db
        .insert(schema.blogPosts)
        .values({
          ...input,
          tags: input.tags as any,
          isPublished: true,
          publishedAt: new Date(),
        } as typeof schema.blogPosts.$inferInsert)
        .$returningId();
      return { success: true, id: result[0].id };
    }),
});