import {
  mysqlTable,
  varchar,
  text,
  int,
  boolean,
  json,
  timestamp,
  index,
} from "drizzle-orm/mysql-core";

// Users table
export const users = mysqlTable(
  "users",
  {
    id: int("id").autoincrement().primaryKey(),
    openId: varchar("openId", { length: 255 }).unique(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }),
    role: varchar("role", { length: 50 }).notNull().default("user"),
    studentApprovalStatus: varchar("studentApprovalStatus", { length: 50 })
      .notNull()
      .default("pending"),
    avatar: varchar("avatar", { length: 500 }),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
    lastSignedIn: timestamp("lastSignedIn"),
  },
  (table) => ({
    emailIdx: index("email_idx").on(table.email),
    roleIdx: index("role_idx").on(table.role),
  })
);

// Video Progress table
export const videoProgress = mysqlTable(
  "videoProgress",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    videoId: varchar("videoId", { length: 255 }).notNull(),
    videoTitle: varchar("videoTitle", { length: 500 }),
    bundleId: varchar("bundleId", { length: 255 }),
    completed: boolean("completed").notNull().default(false),
    lastWatchedAt: timestamp("lastWatchedAt"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    userVideoIdx: index("user_video_idx").on(table.userId, table.videoId),
  })
);

// Video Comments table
export const videoComments = mysqlTable(
  "videoComments",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    videoId: varchar("videoId", { length: 255 }).notNull(),
    videoTitle: varchar("videoTitle", { length: 500 }),
    comment: text("comment").notNull(),
    approved: boolean("approved").notNull().default(false),
    parentCommentId: int("parentCommentId"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    videoIdx: index("comment_video_idx").on(table.videoId),
    approvedIdx: index("approved_idx").on(table.approved),
  })
);

// Comment Upvotes table
export const commentUpvotes = mysqlTable(
  "commentUpvotes",
  {
    id: int("id").autoincrement().primaryKey(),
    commentId: int("commentId").notNull().references(() => videoComments.id, { onDelete: "cascade" }),
    userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    uniqueVote: index("unique_vote").on(table.commentId, table.userId),
  })
);

// Bundle Completions table
export const bundleCompletions = mysqlTable(
  "bundleCompletions",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    bundleId: varchar("bundleId", { length: 255 }).notNull(),
    bundleName: varchar("bundleName", { length: 500 }),
    completedAt: timestamp("completedAt").notNull().defaultNow(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    userBundleIdx: index("user_bundle_idx").on(table.userId, table.bundleId),
  })
);

// Certificates table
export const certificates = mysqlTable(
  "certificates",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    bundleId: varchar("bundleId", { length: 255 }).notNull(),
    bundleName: varchar("bundleName", { length: 500 }),
    certificateUrl: varchar("certificateUrl", { length: 1000 }),
    issuedAt: timestamp("issuedAt").notNull().defaultNow(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    userCertIdx: index("user_cert_idx").on(table.userId, table.bundleId),
  })
);

// Quizzes table
export const quizzes = mysqlTable(
  "quizzes",
  {
    id: int("id").autoincrement().primaryKey(),
    title: varchar("title", { length: 500 }).notNull(),
    description: text("description"),
    bundleId: varchar("bundleId", { length: 255 }),
    questions: json("questions").notNull(),
    passingScore: int("passingScore").default(70),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  }
);

// Quiz Answers table
export const quizAnswers = mysqlTable(
  "quizAnswers",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    quizId: int("quizId").notNull().references(() => quizzes.id, { onDelete: "cascade" }),
    answers: json("answers").notNull(),
    score: int("score").notNull().default(0),
    passed: boolean("passed").default(false),
    completedAt: timestamp("completedAt").notNull().defaultNow(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    userQuizIdx: index("user_quiz_idx").on(table.userId, table.quizId),
  })
);

// Videos/Bundles metadata (stored as static data, could also be in DB)
export const bundles = mysqlTable(
  "bundles",
  {
    id: int("id").autoincrement().primaryKey(),
    bundleId: varchar("bundleId", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 500 }).notNull(),
    description: text("description"),
    thumbnailUrl: varchar("thumbnailUrl", { length: 1000 }),
    orderIndex: int("orderIndex").default(0),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  }
);

export const videos = mysqlTable(
  "videos",
  {
    id: int("id").autoincrement().primaryKey(),
    videoId: varchar("videoId", { length: 255 }).notNull().unique(),
    title: varchar("title", { length: 500 }).notNull(),
    description: text("description"),
    url: varchar("url", { length: 1000 }).notNull(),
    platform: varchar("platform", { length: 50 }).default("youtube"),
    bundleId: varchar("bundleId", { length: 255 }),
    duration: int("duration"),
    thumbnailUrl: varchar("thumbnailUrl", { length: 1000 }),
    orderIndex: int("orderIndex").default(0),
    isPublic: boolean("isPublic").default(false),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    bundleIdx: index("video_bundle_idx").on(table.bundleId),
  })
);

// Services and FAQs (static content) 
export const services = mysqlTable(
  "services",
  {
    id: int("id").autoincrement().primaryKey(),
    title: varchar("title", { length: 500 }).notNull(),
    description: text("description"),
    icon: varchar("icon", { length: 100 }),
    features: json("features"),
    pricing: varchar("pricing", { length: 500 }),
    orderIndex: int("orderIndex").default(0),
    isActive: boolean("isActive").default(true),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  }
);

export const faqs = mysqlTable(
  "faqs",
  {
    id: int("id").autoincrement().primaryKey(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    category: varchar("category", { length: 100 }),
    orderIndex: int("orderIndex").default(0),
    isActive: boolean("isActive").default(true),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  }
);

export const testimonials = mysqlTable(
  "testimonials",
  {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    content: text("content").notNull(),
    rating: int("rating").default(5),
    avatarUrl: varchar("avatarUrl", { length: 1000 }),
    isActive: boolean("isActive").default(true),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  }
);

export const blogPosts = mysqlTable(
  "blogPosts",
  {
    id: int("id").autoincrement().primaryKey(),
    title: varchar("title", { length: 500 }).notNull(),
    slug: varchar("slug", { length: 500 }).notNull().unique(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    author: varchar("author", { length: 255 }),
    coverImage: varchar("coverImage", { length: 1000 }),
    tags: json("tags"),
    isPublished: boolean("isPublished").default(false),
    publishedAt: timestamp("publishedAt"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  }
);