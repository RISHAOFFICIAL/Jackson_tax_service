import { z } from "zod";
import { protectedProcedure, router } from "../index.js";
import { schema, getDb } from "../../db/index.js";
import { eq, and, count, desc } from "drizzle-orm";

export const protectedRouter = router({
  // Get current user info
  getMe: protectedProcedure.query(async ({ ctx }) => {
    const db = getDb();
    const result = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, ctx.user.userId))
      .limit(1);
    return result[0] || null;
  }),

  // Get student's overall progress
  getStudentProgress: protectedProcedure.query(async ({ ctx }) => {
    const db = getDb();
    const userId = ctx.user.userId;

    // Total videos watched
    const videosWatched = await db
      .select({ count: count() })
      .from(schema.videoProgress)
      .where(
        and(
          eq(schema.videoProgress.userId, userId),
          eq(schema.videoProgress.completed, true)
        )
      );

    // Total videos available
    const totalVideos = await db
      .select({ count: count() })
      .from(schema.videos);

    // Bundles completed
    const bundlesCompleted = await db
      .select({ count: count() })
      .from(schema.bundleCompletions)
      .where(eq(schema.bundleCompletions.userId, userId));

    // Total bundles
    const totalBundles = await db
      .select({ count: count() })
      .from(schema.bundles);

    // Certificates earned
    const certificatesEarned = await db
      .select({ count: count() })
      .from(schema.certificates)
      .where(eq(schema.certificates.userId, userId));

    const totalVidCount = totalVideos[0].count || 0;
    const watchedCount = videosWatched[0].count || 0;
    const overallProgress = totalVidCount > 0 ? Math.round((watchedCount / totalVidCount) * 100) : 0;

    return {
      videosWatched: watchedCount,
      totalVideos: totalVidCount,
      bundlesCompleted: bundlesCompleted[0].count || 0,
      totalBundles: totalBundles[0].count || 0,
      certificatesEarned: certificatesEarned[0].count || 0,
      overallProgress,
    };
  }),

  // Mark a video as complete/incomplete
  markVideoComplete: protectedProcedure
    .input(
      z.object({
        videoId: z.string(),
        completed: z.boolean().default(true),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const userId = ctx.user.userId;

      // Get video title
      const video = await db
        .select()
        .from(schema.videos)
        .where(eq(schema.videos.videoId, input.videoId))
        .limit(1);

      const existing = await db
        .select()
        .from(schema.videoProgress)
        .where(
          and(
            eq(schema.videoProgress.userId, userId),
            eq(schema.videoProgress.videoId, input.videoId)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        await db
          .update(schema.videoProgress)
          .set({
            completed: input.completed,
            lastWatchedAt: input.completed ? new Date() : undefined,
          })
          .where(eq(schema.videoProgress.id, existing[0].id));
      } else {
        await db.insert(schema.videoProgress).values({
          userId,
          videoId: input.videoId,
          videoTitle: video[0]?.title || "",
          bundleId: video[0]?.bundleId || "",
          completed: input.completed,
          lastWatchedAt: input.completed ? new Date() : undefined,
        });
      }

      return { success: true };
    }),

  // Get video progress for a specific video
  getVideoProgress: protectedProcedure
    .input(z.object({ videoId: z.string() }))
    .query(async ({ ctx, input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(schema.videoProgress)
        .where(
          and(
            eq(schema.videoProgress.userId, ctx.user.userId),
            eq(schema.videoProgress.videoId, input.videoId)
          )
        )
        .limit(1);
      return result[0] || null;
    }),

  // Get all progress for the user
  getAllProgress: protectedProcedure.query(async ({ ctx }) => {
    const db = getDb();
    const result = await db
      .select()
      .from(schema.videoProgress)
      .where(eq(schema.videoProgress.userId, ctx.user.userId))
      .orderBy(desc(schema.videoProgress.lastWatchedAt));
    return result;
  }),

  // Get comments for a video
  getVideoComments: protectedProcedure
    .input(z.object({ videoId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(schema.videoComments)
        .where(
          and(
            eq(schema.videoComments.videoId, input.videoId),
            eq(schema.videoComments.approved, true)
          )
        )
        .orderBy(desc(schema.videoComments.createdAt));

      // Get user names for comments
      const userIds = [...new Set(result.map((c) => c.userId))];
      const users = await db
        .select({ id: schema.users.id, name: schema.users.name, avatar: schema.users.avatar })
        .from(schema.users)
        .where(eq(schema.users.id, userIds[0])); // Simplified join

      const userMap = new Map(users.map((u) => [u.id, u]));

      return result.map((comment) => ({
        ...comment,
        user: userMap.get(comment.userId) || { id: comment.userId, name: "Unknown", avatar: null },
      }));
    }),

  // Add a comment to a video
  addVideoComment: protectedProcedure
    .input(
      z.object({
        videoId: z.string(),
        videoTitle: z.string().optional(),
        comment: z.string().min(1, "Comment cannot be empty").max(1000),
        parentCommentId: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const result = await db
        .insert(schema.videoComments)
        .values({
          userId: ctx.user.userId,
          videoId: input.videoId,
          videoTitle: input.videoTitle || "",
          comment: input.comment,
          approved: false, // Needs admin approval
          parentCommentId: input.parentCommentId,
        })
        .$returningId();

      return {
        success: true,
        commentId: result[0].id,
        message: "Comment submitted for review",
      };
    }),

  // Upvote a comment
  upvoteComment: protectedProcedure
    .input(z.object({ commentId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();

      // Check if already upvoted
      const existing = await db
        .select()
        .from(schema.commentUpvotes)
        .where(
          and(
            eq(schema.commentUpvotes.commentId, input.commentId),
            eq(schema.commentUpvotes.userId, ctx.user.userId)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        // Remove upvote
        await db
          .delete(schema.commentUpvotes)
          .where(eq(schema.commentUpvotes.id, existing[0].id));
        return { upvoted: false };
      }

      await db.insert(schema.commentUpvotes).values({
        commentId: input.commentId,
        userId: ctx.user.userId,
      });

      return { upvoted: true };
    }),

  // Get bundle progress
  getBundleProgress: protectedProcedure.query(async ({ ctx }) => {
    const db = getDb();
    const userId = ctx.user.userId;

    const bundles = await db.select().from(schema.bundles).orderBy(schema.bundles.orderIndex);
    const completed = await db
      .select()
      .from(schema.bundleCompletions)
      .where(eq(schema.bundleCompletions.userId, userId));

    const completedBundleIds = new Set(completed.map((b) => b.bundleId));

    return bundles.map((bundle) => ({
      ...bundle,
      completed: completedBundleIds.has(bundle.bundleId),
    }));
  }),

  // Get user's certificates
  getCertificates: protectedProcedure.query(async ({ ctx }) => {
    const db = getDb();
    const result = await db
      .select()
      .from(schema.certificates)
      .where(eq(schema.certificates.userId, ctx.user.userId))
      .orderBy(desc(schema.certificates.issuedAt));
    return result;
  }),

  // Get all videos (for student portal)
  getAllVideos: protectedProcedure.query(async () => {
    const db = getDb();
    const result = await db
      .select()
      .from(schema.videos)
      .orderBy(schema.videos.orderIndex);
    return result;
  }),

  // Get quizzes for a bundle
  getBundleQuizzes: protectedProcedure
    .input(z.object({ bundleId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(schema.quizzes)
        .where(eq(schema.quizzes.bundleId, input.bundleId));
      return result;
    }),

  // Submit quiz answers
  submitQuiz: protectedProcedure
    .input(
      z.object({
        quizId: z.number(),
        answers: z.array(z.object({
          questionIndex: z.number(),
          answer: z.any(),
        })),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();

      const quiz = await db
        .select()
        .from(schema.quizzes)
        .where(eq(schema.quizzes.id, input.quizId))
        .limit(1);

      if (quiz.length === 0) throw new Error("Quiz not found");

      const questions = quiz[0].questions as any[];
      let correct = 0;
      const total = questions.length;

      input.answers.forEach((ans) => {
        const question = questions[ans.questionIndex];
        if (question && question.correctAnswer === ans.answer) {
          correct++;
        }
      });

      const score = Math.round((correct / total) * 100);
      const passed = score >= (quiz[0].passingScore || 70);

      const result = await db
        .insert(schema.quizAnswers)
        .values({
          userId: ctx.user.userId,
          quizId: input.quizId,
          answers: input.answers as any,
          score,
          passed,
        })
        .$returningId();

      return {
        success: true,
        score,
        passed,
        correct,
        total,
        quizAnswerId: result[0].id,
      };
    }),

  // Get user's quiz results
  getQuizResults: protectedProcedure.query(async ({ ctx }) => {
    const db = getDb();
    const result = await db
      .select()
      .from(schema.quizAnswers)
      .where(eq(schema.quizAnswers.userId, ctx.user.userId))
      .orderBy(desc(schema.quizAnswers.completedAt));
    return result;
  }),
});