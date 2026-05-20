import "dotenv/config";
import { createDbConnection, getDb, schema } from "./db/index.js";
import { eq } from "drizzle-orm";

async function seed() {
  await createDbConnection();
  const db = getDb();
  console.log("Seeding database...");

  // Seed admin user
  const adminExists = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, "ajackstaxservice@gmail.com"))
    .limit(1);

  if (adminExists.length === 0) {
    const { hashPassword } = await import("./auth/index.js");
    const hashedPw = await hashPassword("Admin@123456");
    await db.insert(schema.users).values({
      name: "Austin Jackson",
      email: "ajackstaxservice@gmail.com",
      password: hashedPw,
      role: "admin",
      studentApprovalStatus: "approved",
    });
    console.log("Admin user created");
  }

  // Seed services
  await db.delete(schema.services);
  await db.insert(schema.services).values([
    {
      title: "Individual Tax Returns",
      description: "Comprehensive tax preparation for individuals including W-2 employees and 1099 contractors. Maximize your refund with expert filing.",
      icon: "FileText",
      features: JSON.stringify(["W-2 Employee Returns", "1099 Contractor Filing", "Self-Employment Taxes", "Deduction Optimization", "Electronic Filing"]),
      pricing: "Starting at $150",
      orderIndex: 1,
      isActive: true,
    },
    {
      title: "Business Taxes",
      description: "Full-service tax preparation for LLCs, corporations, and partnerships. Keep your business compliant and tax-efficient.",
      icon: "Building2",
      features: JSON.stringify(["LLC Tax Filing", "Corporate Returns", "Partnership Returns", "Quarterly Estimates", "Business Deductions"]),
      pricing: "Starting at $350",
      orderIndex: 2,
      isActive: true,
    },
    {
      title: "Year-Round Bookkeeping",
      description: "Professional bookkeeping services to keep your finances organized throughout the year. Focus on growing your business.",
      icon: "BookOpen",
      features: JSON.stringify(["Monthly Reconciliation", "Expense Tracking", "Financial Reports", "Payroll Support", "Tax-Ready Records"]),
      pricing: "Starting at $200/month",
      orderIndex: 3,
      isActive: true,
    },
    {
      title: "Rapid Refunds",
      description: "Get your tax refund fast with our rapid refund processing. Up to $7,000 advanced the same day your return is accepted.",
      icon: "Zap",
      features: JSON.stringify(["Same-Day Processing", "Up to $7,000 Advance", "Direct Deposit", "No Hidden Fees", "Fast Approval"]),
      pricing: "Call for details",
      orderIndex: 4,
      isActive: true,
    },
  ]);
  console.log("Services seeded");

  // Seed FAQs
  await db.delete(schema.faqs);
  await db.insert(schema.faqs).values([
    {
      question: "What documents do I need to bring for tax preparation?",
      answer: "Please bring your W-2s, 1099s, last year's tax return, identification (driver's license or state ID), Social Security cards for all dependents, bank account and routing numbers for direct deposit, and any other income or deduction documents you've received.",
      category: "general",
      orderIndex: 1,
      isActive: true,
    },
    {
      question: "How long does it take to get my tax refund?",
      answer: "With electronic filing and direct deposit, most refunds are processed within 21 days. With our Rapid Refund service, you can get up to $7,000 advanced the same day your return is accepted by the IRS.",
      category: "refunds",
      orderIndex: 2,
      isActive: true,
    },
    {
      question: "Do you offer year-round support?",
      answer: "Yes! We provide year-round support for all our clients. Whether you have questions about tax notices, need help with quarterly estimates, or want to plan for next tax season, we're here to help. Call us at 313-427-4856 anytime.",
      category: "support",
      orderIndex: 3,
      isActive: true,
    },
    {
      question: "Can you help with back taxes or IRS issues?",
      answer: "Absolutely. We can assist with back tax returns, IRS notices, payment plans, and offers in compromise. Contact us immediately if you're dealing with IRS issues so we can help resolve them.",
      category: "support",
      orderIndex: 4,
      isActive: true,
    },
    {
      question: "What types of businesses do you work with?",
      answer: "We work with all business types including sole proprietors, single-member LLCs, multi-member LLCs, S-Corporations, C-Corporations, and partnerships. We also provide bookkeeping services to keep your business finances organized year-round.",
      category: "business",
      orderIndex: 5,
      isActive: true,
    },
    {
      question: "How do I upload my tax documents?",
      answer: "You can upload your documents securely through our client portal at https://kskfyeugzjwrzaxvq4om.app.clientclub.net/. Simply click the 'Upload Documents' button on our website and follow the instructions.",
      category: "general",
      orderIndex: 6,
      isActive: true,
    },
    {
      question: "Do you offer virtual or remote tax services?",
      answer: "Yes! We offer both in-person and virtual tax preparation services. You can upload your documents online, schedule a virtual consultation via Calendly, and we'll prepare your taxes remotely. We serve clients throughout Michigan.",
      category: "general",
      orderIndex: 7,
      isActive: true,
    },
    {
      question: "What is your pricing structure?",
      answer: "Our pricing depends on the complexity of your tax situation. Individual tax returns start at $150, business returns start at $350, and bookkeeping services start at $200/month. We offer free initial consultations to discuss your specific needs and provide an accurate quote.",
      category: "pricing",
      orderIndex: 8,
      isActive: true,
    },
  ]);
  console.log("FAQs seeded");

  // Seed testimonials
  await db.delete(schema.testimonials);
  await db.insert(schema.testimonials).values([
    {
      name: "Sarah M.",
      content: "Austin made filing my taxes so easy! As a freelance graphic designer, I was worried about my 1099 forms, but he handled everything professionally. Got my refund in less than 2 weeks!",
      rating: 5,
      isActive: true,
    },
    {
      name: "James R.",
      content: "I've been going to Jackson Tax Service for 3 years now. They're always professional, knowledgeable, and get me the best refund possible. Highly recommend!",
      rating: 5,
      isActive: true,
    },
    {
      name: "Maria L.",
      content: "Started using their bookkeeping service this year and it's been a game-changer for my small business. Everything is organized and tax-ready. Worth every penny!",
      rating: 5,
      isActive: true,
    },
    {
      name: "David K.",
      content: "Needed help with some back taxes and IRS notices. Austin was incredibly helpful and walked me through the entire process. Took a huge weight off my shoulders.",
      rating: 5,
      isActive: true,
    },
  ]);
  console.log("Testimonials seeded");

  // Seed bundles
  await db.delete(schema.bundles);
  await db.insert(schema.bundles).values([
    {
      bundleId: "tax-fundamentals",
      name: "Tax Fundamentals",
      description: "Learn the basics of tax preparation, from understanding tax forms to filing your first return. Perfect for beginners and aspiring tax professionals.",
      thumbnailUrl: "",
      orderIndex: 1,
    },
    {
      bundleId: "business-strategy",
      name: "Business Strategy",
      description: "Advanced tax strategies for business owners. Learn about entity selection, deductions, and tax planning for maximum savings.",
      thumbnailUrl: "",
      orderIndex: 2,
    },
    {
      bundleId: "tax-advanced",
      name: "Advanced Tax Training",
      description: "In-depth training on complex tax topics including audits, multi-state filing, and tax resolution services.",
      thumbnailUrl: "",
      orderIndex: 3,
    },
  ]);
  console.log("Bundles seeded");

  // Seed sample videos
  await db.delete(schema.videos);
  await db.insert(schema.videos).values([
    {
      videoId: "intro-tax-basics",
      title: "Introduction to Tax Basics",
      description: "Learn the fundamental concepts of tax preparation and filing.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      platform: "youtube",
      bundleId: "tax-fundamentals",
      duration: 1200,
      orderIndex: 1,
      isPublic: true,
    },
    {
      videoId: "understanding-w2",
      title: "Understanding W-2 Forms",
      description: "A comprehensive guide to reading and filing W-2 forms.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      platform: "youtube",
      bundleId: "tax-fundamentals",
      duration: 900,
      orderIndex: 2,
      isPublic: true,
    },
    {
      videoId: "business-entity-selection",
      title: "Business Entity Selection",
      description: "How to choose the right business structure for tax purposes.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      platform: "youtube",
      bundleId: "business-strategy",
      duration: 1500,
      orderIndex: 1,
      isPublic: true,
    },
    {
      videoId: "tax-deductions-guide",
      title: "Ultimate Guide to Tax Deductions",
      description: "Maximize your deductions with this comprehensive guide.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      platform: "youtube",
      bundleId: "business-strategy",
      duration: 1800,
      orderIndex: 2,
      isPublic: true,
    },
    {
      videoId: "audit-preparation",
      title: "Audit Preparation and Response",
      description: "How to prepare for and respond to IRS audits.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      platform: "youtube",
      bundleId: "tax-advanced",
      duration: 2100,
      orderIndex: 1,
      isPublic: true,
    },
  ]);
  console.log("Sample videos seeded");

  // Seed sample blog posts
  await db.delete(schema.blogPosts);
  await db.insert(schema.blogPosts).values([
    {
      title: "5 Essential Tax Tips for Freelancers in 2025",
      slug: "tax-tips-freelancers-2025",
      excerpt: "Navigate self-employment taxes with confidence. Here are the top tips every freelancer should know.",
      content: "As a freelancer, understanding your tax obligations is crucial. Here are our top 5 tips for staying on top of your taxes this year...",
      author: "Austin Jackson",
      tags: JSON.stringify(["freelancer", "self-employment", "tax-tips"]),
      isPublished: true,
      publishedAt: new Date("2025-01-15"),
    },
    {
      title: "When Should You Start Planning for Tax Season?",
      slug: "when-to-plan-tax-season",
      excerpt: "The best time to prepare for tax season might surprise you. Year-round planning saves money and stress.",
      content: "Many taxpayers wait until April to think about taxes, but the smartest approach is year-round planning...",
      author: "Austin Jackson",
      tags: JSON.stringify(["tax-planning", "preparation"]),
      isPublished: true,
      publishedAt: new Date("2025-02-01"),
    },
    {
      title: "Common Tax Deductions for Small Business Owners",
      slug: "common-business-tax-deductions",
      excerpt: "Don't miss these valuable deductions that could save your business thousands.",
      content: "Running a small business comes with many tax advantages. Here are the deductions you shouldn't miss...",
      author: "Austin Jackson",
      tags: JSON.stringify(["business", "deductions", "small-business"]),
      isPublished: true,
      publishedAt: new Date("2025-03-10"),
    },
  ]);
  console.log("Blog posts seeded");

  console.log("✅ Database seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});