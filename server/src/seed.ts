import "dotenv/config";
import { createDbConnection, getDb, schema } from "./db/index.js";
import { eq } from "drizzle-orm";

async function seed() {
  await createDbConnection();
  const db = getDb();
  // NOTE: drizzle-orm 0.38.4 has a type-inference bug where optional columns are
  // missing from the insert model. The `as any` casts on `.values()` below work
  // around that — all column names are valid (see schema.ts); no runtime change.
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
    } as any);
    console.log("Admin user created");
  }

  // Also create a sample student user for testing
  const studentExists = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, "student@example.com"))
    .limit(1);

  if (studentExists.length === 0) {
    const { hashPassword } = await import("./auth/index.js");
    const hashedPw = await hashPassword("Student@123");
    await db.insert(schema.users).values({
      name: "Jane Doe",
      email: "student@example.com",
      password: hashedPw,
      role: "user",
      studentApprovalStatus: "approved",
    } as any);
    console.log("Sample student user created (student@example.com / Student@123)");
  }

  // ========== SEED SERVICES ==========
  await db.delete(schema.services);
  await db.insert(schema.services).values([
    {
      title: "Individual Tax Returns",
      description: "Comprehensive tax preparation for individuals including W-2 employees and 1099 contractors. Maximize your refund with expert filing.",
      icon: "FileText",
      features: JSON.stringify(["W-2 Employee Returns", "1099 Contractor Filing", "Self-Employment Taxes", "Deduction Optimization", "Electronic Filing", "Direct Deposit"]),
      pricing: "Starting at $150",
      orderIndex: 1,
      isActive: true,
    },
    {
      title: "Business Taxes",
      description: "Full-service tax preparation for LLCs, corporations, and partnerships. Keep your business compliant and tax-efficient.",
      icon: "Building2",
      features: JSON.stringify(["LLC Tax Filing", "Corporate Returns (S-Corp & C-Corp)", "Partnership Returns", "Quarterly Estimated Payments", "Business Deductions Consulting"]),
      pricing: "Starting at $350",
      orderIndex: 2,
      isActive: true,
    },
    {
      title: "Year-Round Bookkeeping",
      description: "Professional bookkeeping services to keep your finances organized throughout the year. Focus on growing your business while we handle the numbers.",
      icon: "BookOpen",
      features: JSON.stringify(["Monthly Reconciliation", "Expense Tracking & Categorization", "Financial Reports (P&L, Balance Sheet)", "Payroll Support", "Tax-Ready Records"]),
      pricing: "Starting at $200/month",
      orderIndex: 3,
      isActive: true,
    },
    {
      title: "Rapid Refunds",
      description: "Get your tax refund fast with our rapid refund processing. Up to $7,000 advanced the same day your return is accepted by the IRS.",
      icon: "Zap",
      features: JSON.stringify(["Same-Day Processing", "Up to $7,000 Advance", "Direct Deposit to Your Account", "No Hidden Fees", "Fast Approval Process"]),
      pricing: "Call for details",
      orderIndex: 4,
      isActive: true,
    },
  ] as any);
  console.log("✅ Services seeded");

  // ========== SEED FAQs ==========
  await db.delete(schema.faqs);
  await db.insert(schema.faqs).values([
    {
      question: "What documents do I need to bring for tax preparation?",
      answer: "Please bring your W-2s, 1099s, last year's tax return, identification (driver's license or state ID), Social Security cards for all dependents, bank account and routing numbers for direct deposit, and any other income or deduction documents you've received. If you're missing any documents, we can often help you obtain copies from the IRS or your employer.",
      category: "general",
      orderIndex: 1,
      isActive: true,
    },
    {
      question: "How long does it take to get my tax refund?",
      answer: "With electronic filing and direct deposit, most refunds are processed within 21 days. With our Rapid Refund service, you can get up to $7,000 advanced the same day your return is accepted by the IRS. The exact timeline depends on your specific tax situation and the IRS processing times.",
      category: "refunds",
      orderIndex: 2,
      isActive: true,
    },
    {
      question: "Do you offer year-round support?",
      answer: "Yes! We provide year-round support for all our clients. Whether you have questions about tax notices, need help with quarterly estimates, or want to plan for next tax season, we're here to help. Call us at 313-427-4856 anytime. We don't disappear after April 15th — we're your year-round tax partner.",
      category: "support",
      orderIndex: 3,
      isActive: true,
    },
    {
      question: "Can you help with back taxes or IRS issues?",
      answer: "Absolutely. We can assist with back tax returns, IRS notices, payment plans, offers in compromise, and penalty abatement. Contact us immediately if you're dealing with IRS issues — the sooner we get involved, the more options we have to resolve your situation favorably.",
      category: "support",
      orderIndex: 4,
      isActive: true,
    },
    {
      question: "What types of businesses do you work with?",
      answer: "We work with all business types including sole proprietors, single-member LLCs, multi-member LLCs, S-Corporations, C-Corporations, and partnerships. We also provide comprehensive bookkeeping services to keep your business finances organized year-round. Whether you're a startup or an established business, we have the expertise to help.",
      category: "business",
      orderIndex: 5,
      isActive: true,
    },
    {
      question: "How do I upload my tax documents?",
      answer: "You can upload your documents securely through our client portal at https://kinlock.cloudtaxoffice.com/proavalon/CoreLink/Index?ReturnUrl=%2fproavalon. Simply click the 'Client Portal' button on our website and follow the instructions. The portal is encrypted and secure — your sensitive financial information is always protected.",
      category: "general",
      orderIndex: 6,
      isActive: true,
    },
    {
      question: "Do you offer virtual or remote tax services?",
      answer: "Yes! We offer both in-person and virtual tax preparation services. You can upload your documents online, schedule a virtual consultation via Calendly, and we'll prepare your taxes remotely. We serve clients throughout Michigan and beyond. Virtual consultations make it easy and convenient to get professional tax help from anywhere.",
      category: "general",
      orderIndex: 7,
      isActive: true,
    },
    {
      question: "What is your pricing structure?",
      answer: "Our pricing depends on the complexity of your tax situation. Individual tax returns start at $150, business returns start at $350, and bookkeeping services start at $200/month. We offer free initial consultations to discuss your specific needs and provide an accurate, no-obligation quote. We believe in transparent pricing with no hidden fees.",
      category: "pricing",
      orderIndex: 8,
      isActive: true,
    },
    {
      question: "What is the difference between a tax credit and a tax deduction?",
      answer: "A tax deduction reduces your taxable income (the amount of income you pay taxes on), while a tax credit directly reduces the amount of tax you owe dollar-for-dollar. For example, a $1,000 deduction might save you $220 in taxes (if you're in the 22% bracket), but a $1,000 credit saves you the full $1,000. Both are valuable, but credits generally provide greater savings.",
      category: "education",
      orderIndex: 9,
      isActive: true,
    },
    {
      question: "Do I need to pay quarterly estimated taxes as a freelancer?",
      answer: "If you expect to owe $1,000 or more in taxes when you file your annual return, you generally need to make quarterly estimated tax payments. This applies to freelancers, independent contractors, and self-employed individuals. We can help you calculate your quarterly payments and set up a payment schedule to avoid penalties at tax time.",
      category: "business",
      orderIndex: 10,
      isActive: true,
    },
  ] as any);
  console.log("✅ FAQs seeded");

  // ========== SEED TESTIMONIALS ==========
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
    {
      name: "Lisa T.",
      content: "As a first-time business owner, I was overwhelmed by tax requirements. Austin walked me through everything step by step. Now I feel confident about my finances. Best decision I made this year!",
      rating: 5,
      isActive: true,
    },
    {
      name: "Michael P.",
      content: "Rapid Refund service is no joke — I got my advance the same day. When you need cash fast, Jackson Tax Service delivers. Professional and efficient.",
      rating: 5,
      isActive: true,
    },
    {
      name: "Rebecca J.",
      content: "I appreciate how responsive Austin is. Even during tax season, he takes the time to explain things clearly. My family has been coming here for years and we won't go anywhere else.",
      rating: 5,
      isActive: true,
    },
  ] as any);
  console.log("✅ Testimonials seeded");

  // ========== SEED BUNDLES ==========
  await db.delete(schema.bundles);
  await db.insert(schema.bundles).values([
    {
      bundleId: "tax-fundamentals",
      name: "Tax Fundamentals",
      description: "Learn the basics of tax preparation, from understanding tax forms to filing your first return. Perfect for beginners and aspiring tax professionals who want to build a solid foundation in tax knowledge.",
      thumbnailUrl: "",
      orderIndex: 1,
    },
    {
      bundleId: "business-strategy",
      name: "Business Strategy",
      description: "Advanced tax strategies for business owners and entrepreneurs. Learn about entity selection, deductions, and tax planning for maximum savings. Ideal for small business owners and accounting professionals.",
      thumbnailUrl: "",
      orderIndex: 2,
    },
    {
      bundleId: "tax-advanced",
      name: "Advanced Tax Training",
      description: "In-depth training on complex tax topics including audits, multi-state filing, tax resolution services, and advanced planning strategies. Designed for experienced preparers looking to expand their expertise.",
      thumbnailUrl: "",
      orderIndex: 3,
    },
  ] as any);
  console.log("✅ Bundles seeded");

  // ========== SEED VIDEOS ==========
  // NOTE: These are SAMPLE videos for the student portal. The `url` fields point
  // to real, public YouTube tax-education videos so the player works out of the
  // box in development. Replace each `url` with Austin's actual training content
  // (YouTube/Vimeo embed links) before production launch.
  await db.delete(schema.videos);
  await db.insert(schema.videos).values([
    // Tax Fundamentals Bundle (7 videos)
    {
      videoId: "intro-tax-basics",
      title: "Introduction to Tax Basics",
      description: "Learn the fundamental concepts of tax preparation and filing. This video covers the core principles every taxpayer should know.",
      url: "https://www.youtube.com/embed/Cox8rLXYAGQ",
      platform: "youtube",
      bundleId: "tax-fundamentals",
      duration: 1200,
      orderIndex: 1,
      isPublic: true,
    },
    {
      videoId: "understanding-w2",
      title: "Understanding W-2 Forms Step by Step",
      description: "A comprehensive guide to reading and filing W-2 forms. We break down each box and explain what it means for your tax return.",
      url: "https://www.youtube.com/embed/8YeU1gbuR9g",
      platform: "youtube",
      bundleId: "tax-fundamentals",
      duration: 900,
      orderIndex: 2,
      isPublic: true,
    },
    {
      videoId: "1099-income-guide",
      title: "Managing 1099 Income & Self-Employment Tax",
      description: "Essential training for independent contractors and freelancers on handling 1099 income, self-employment tax, and quarterly estimated payments.",
      url: "https://www.youtube.com/embed/AMXGBH7hoJY",
      platform: "youtube",
      bundleId: "tax-fundamentals",
      duration: 1500,
      orderIndex: 3,
      isPublic: true,
    },
    {
      videoId: "standard-vs-itemized",
      title: "Standard Deduction vs. Itemized Deductions",
      description: "Learn when to take the standard deduction and when itemizing makes more financial sense. Real examples with calculations.",
      url: "https://www.youtube.com/embed/Z2r_apNMTeM",
      platform: "youtube",
      bundleId: "tax-fundamentals",
      duration: 1100,
      orderIndex: 4,
      isPublic: true,
    },
    {
      videoId: "child-tax-credits",
      title: "Child Tax Credits & Family Tax Benefits",
      description: "Maximize your family's tax benefits. Covers Child Tax Credit, Earned Income Tax Credit, Child and Dependent Care Credit, and more.",
      url: "https://www.youtube.com/embed/lm6ZLLQB3AM",
      platform: "youtube",
      bundleId: "tax-fundamentals",
      duration: 1300,
      orderIndex: 5,
      isPublic: true,
    },
    {
      videoId: "filing-statuses",
      title: "Tax Filing Statuses Explained",
      description: "Understanding the difference between Single, Married Filing Jointly, Married Filing Separately, Head of Household, and Qualifying Widow(er).",
      url: "https://www.youtube.com/embed/qvZr9SgwJYI",
      platform: "youtube",
      bundleId: "tax-fundamentals",
      duration: 800,
      orderIndex: 6,
      isPublic: true,
    },
    {
      videoId: "efile-101",
      title: "Electronic Filing 101: How E-File Works",
      description: "Everything you need to know about electronic filing — how it works, security, benefits, and what happens after you file.",
      url: "https://www.youtube.com/embed/7Q5s6H8lGFU",
      platform: "youtube",
      bundleId: "tax-fundamentals",
      duration: 700,
      orderIndex: 7,
      isPublic: true,
    },

    // Business Strategy Bundle (5 videos)
    {
      videoId: "business-entity-selection",
      title: "Which Business Entity is Right for You?",
      description: "Compare LLCs, S-Corps, C-Corps, and sole proprietorships from a tax perspective. Learn which structure saves you the most money.",
      url: "https://www.youtube.com/embed/Rz0l57A2iEk",
      platform: "youtube",
      bundleId: "business-strategy",
      duration: 1500,
      orderIndex: 1,
      isPublic: true,
    },
    {
      videoId: "tax-deductions-guide",
      title: "Ultimate Guide to Business Tax Deductions",
      description: "Maximize your business deductions with this comprehensive guide covering home office, vehicle, equipment, travel, meals, and more.",
      url: "https://www.youtube.com/embed/j-C12y65NBg",
      platform: "youtube",
      bundleId: "business-strategy",
      duration: 1800,
      orderIndex: 2,
      isPublic: true,
    },
    {
      videoId: "quarterly-estimates",
      title: "Mastering Quarterly Estimated Tax Payments",
      description: "How to calculate, pay, and plan for quarterly estimated taxes. Avoid underpayment penalties and manage your cash flow effectively.",
      url: "https://www.youtube.com/embed/fHqtBXzdMyE",
      platform: "youtube",
      bundleId: "business-strategy",
      duration: 1400,
      orderIndex: 3,
      isPublic: true,
    },
    {
      videoId: "payroll-taxes",
      title: "Payroll Taxes Explained for Small Business Owners",
      description: "Understanding payroll tax obligations, including Social Security, Medicare, FUTA, SUTA, and proper payroll reporting requirements.",
      url: "https://www.youtube.com/embed/71vwVX67KNM",
      platform: "youtube",
      bundleId: "business-strategy",
      duration: 1600,
      orderIndex: 4,
      isPublic: true,
    },
    {
      videoId: "business-tax-planning",
      title: "Year-Round Tax Planning for Businesses",
      description: "Strategic tax planning techniques to minimize your business tax burden throughout the year, not just at filing time.",
      url: "https://www.youtube.com/embed/ROb2Vp5Rs7A",
      platform: "youtube",
      bundleId: "business-strategy",
      duration: 2000,
      orderIndex: 5,
      isPublic: true,
    },

    // Advanced Tax Training Bundle (4 videos)
    {
      videoId: "audit-preparation",
      title: "IRS Audit Preparation and Response",
      description: "How to prepare for and respond to IRS audits. Learn what triggers audits, how to organize documentation, and how to navigate the audit process.",
      url: "https://www.youtube.com/embed/7Qtr_vA3Prw",
      platform: "youtube",
      bundleId: "tax-advanced",
      duration: 2100,
      orderIndex: 1,
      isPublic: true,
    },
    {
      videoId: "multi-state-filing",
      title: "Multi-State Tax Filing Complexities",
      description: "Navigate the complexities of filing taxes in multiple states — residency rules, sourcing income, credits, and apportionment for businesses.",
      url: "https://www.youtube.com/embed/LYsqkGRpv_k",
      platform: "youtube",
      bundleId: "tax-advanced",
      duration: 1900,
      orderIndex: 2,
      isPublic: true,
    },
    {
      videoId: "tax-resolution",
      title: "Tax Resolution Services: IRS Problem Solving",
      description: "Comprehensive training on tax resolution including offers in compromise, payment plans, penalty abatement, and innocent spouse relief.",
      url: "https://www.youtube.com/embed/EJpTwf9b82M",
      platform: "youtube",
      bundleId: "tax-advanced",
      duration: 2400,
      orderIndex: 3,
      isPublic: true,
    },
    {
      videoId: "estate-trust-taxes",
      title: "Estate & Trust Tax Preparation",
      description: "Advanced training on preparing estate and trust tax returns (Forms 1041, 706) and understanding the tax implications of inheritance and trusts.",
      url: "https://www.youtube.com/embed/Cox8rLXYAGQ",
      platform: "youtube",
      bundleId: "tax-advanced",
      duration: 2200,
      orderIndex: 4,
      isPublic: true,
    },
  ] as any);
  console.log("✅ Videos seeded (16 total across 3 bundles)");

  // ========== SEED SAMPLE QUIZZES ==========
  await db.delete(schema.quizzes);
  await db.insert(schema.quizzes).values([
    {
      title: "Tax Fundamentals Knowledge Check",
      description: "Test your understanding of basic tax concepts covered in the Tax Fundamentals bundle.",
      bundleId: "tax-fundamentals",
      passingScore: 70,
      questions: JSON.stringify([
        {
          question: "What is the standard deduction for a single filer in 2024?",
          options: ["$12,950", "$13,850", "$14,600", "$15,000"],
          correctAnswer: "$14,600",
        },
        {
          question: "Which form do employers use to report wages and taxes withheld?",
          options: ["1099-NEC", "W-2", "1099-MISC", "1040"],
          correctAnswer: "W-2",
        },
        {
          question: "What is the difference between a tax credit and a tax deduction?",
          options: [
            "They are the same thing",
            "A credit reduces income, a deduction reduces tax owed",
            "A credit reduces tax owed dollar-for-dollar, a deduction reduces taxable income",
            "A deduction is only for businesses",
          ],
          correctAnswer: "A credit reduces tax owed dollar-for-dollar, a deduction reduces taxable income",
        },
        {
          question: "What is the deadline for filing individual tax returns?",
          options: ["March 15", "April 15", "April 18", "June 15"],
          correctAnswer: "April 15",
        },
        {
          question: "Which filing status typically results in the lowest tax for a unmarried person with a dependent?",
          options: ["Single", "Head of Household", "Qualifying Widow(er)", "Married Filing Separately"],
          correctAnswer: "Head of Household",
        },
      ]),
    },
    {
      title: "Business Tax Strategy Quiz",
      description: "Assess your knowledge of business tax strategies and entity selection.",
      bundleId: "business-strategy",
      passingScore: 70,
      questions: JSON.stringify([
        {
          question: "What is the main tax advantage of an S-Corporation?",
          options: [
            "No tax return required",
            "Pass-through taxation with potential self-employment tax savings",
            "No payroll requirements",
            "Higher tax rates",
          ],
          correctAnswer: "Pass-through taxation with potential self-employment tax savings",
        },
        {
          question: "How often must businesses with payroll file payroll tax reports?",
          options: ["Annually", "Semi-annually", "Quarterly", "Monthly"],
          correctAnswer: "Quarterly",
        },
        {
          question: "Which of the following is NOT a deductible business expense?",
          options: ["Home office expenses", "Business travel", "Personal entertainment", "Professional fees"],
          correctAnswer: "Personal entertainment",
        },
        {
          question: "What is the purpose of quarterly estimated tax payments?",
          options: [
            "To pay extra taxes voluntarily",
            "To pay taxes on income not subject to withholding throughout the year",
            "To get a larger refund",
            "To avoid filing an annual return",
          ],
          correctAnswer: "To pay taxes on income not subject to withholding throughout the year",
        },
      ]),
    },
  ] as any);
  console.log("✅ Quizzes seeded");

  // ========== SEED BLOG POSTS ==========
  await db.delete(schema.blogPosts);
  await db.insert(schema.blogPosts).values([
    {
      title: "5 Essential Tax Tips for Freelancers in 2025",
      slug: "tax-tips-freelancers-2025",
      excerpt: "Navigate self-employment taxes with confidence. Here are the top tips every freelancer should know to maximize deductions and minimize stress.",
      content: `As a freelancer, understanding your tax obligations is crucial. Here are our top 5 tips for staying on top of your taxes this year:

1. Track Every Expense: Use accounting software or a simple spreadsheet to track all business expenses throughout the year. This includes home office deductions, internet bills, software subscriptions, and equipment purchases.

2. Make Quarterly Estimated Payments: The IRS expects freelancers to pay taxes quarterly. Missing these payments can result in penalties. We recommend setting aside 25-30% of each payment for taxes.

3. Separate Business and Personal Accounts: Having a dedicated business bank account and credit card makes tax preparation much easier and provides a clear paper trail for deductions.

4. Maximize Retirement Contributions: Consider a SEP IRA or Solo 401(k) — these retirement accounts allow you to contribute up to 25% of your net earnings, significantly reducing your taxable income.

5. Work with a Professional: Tax laws for self-employed individuals are complex. A professional tax preparer can identify deductions you might miss and help you avoid costly mistakes.

At Jackson Tax Service, we specialize in helping freelancers and independent contractors navigate their tax obligations. Contact us today for a free consultation!`,
      author: "Austin Jackson",
      tags: JSON.stringify(["freelancer", "self-employment", "tax-tips", "independent-contractor"]),
      isPublished: true,
      publishedAt: new Date("2025-01-15"),
    },
    {
      title: "When Should You Start Planning for Tax Season?",
      slug: "when-to-plan-tax-season",
      excerpt: "The best time to prepare for tax season might surprise you. Year-round planning saves money and reduces stress come April.",
      content: `Many taxpayers wait until April to think about taxes, but the smartest approach is year-round planning. Here's why starting early matters:

THE CASE FOR YEAR-ROUND PLANNING
Waiting until tax season to organize your finances means you're reacting rather than planning. Year-round tax planning allows you to make strategic decisions that can significantly reduce your tax burden.

QUARTERLY CHECK-INS
We recommend scheduling quarterly check-ins (April, June, September, and January) to review your tax situation. These check-ins help you:
- Adjust withholding or estimated payments
- Identify major life changes affecting your taxes
- Plan major purchases or investments strategically
- Avoid surprises at filing time

MAJOR LIFE EVENTS
Getting married, buying a home, having a child, or starting a business all have significant tax implications. Planning ahead for these events can save thousands.

WORK WITH A PRO
Year-round support is one of the biggest advantages of working with a professional tax service. At Jackson Tax Service, we're available all year — not just during tax season. Call us at 313-427-4856 to schedule your quarterly review.`,
      author: "Austin Jackson",
      tags: JSON.stringify(["tax-planning", "preparation", "year-round"]),
      isPublished: true,
      publishedAt: new Date("2025-02-01"),
    },
    {
      title: "Common Tax Deductions for Small Business Owners",
      slug: "common-business-tax-deductions",
      excerpt: "Don't miss these valuable deductions that could save your business thousands of dollars this tax season.",
      content: `Running a small business comes with many tax advantages. Here are the deductions you shouldn't miss:

1. HOME OFFICE DEDUCTION
If you use part of your home regularly and exclusively for business, you may qualify for the home office deduction. You can use the simplified method ($5 per square foot, up to 300 sq ft) or the regular method based on actual expenses.

2. VEHICLE EXPENSES
Business vehicle expenses can be deducted using either the standard mileage rate (67 cents per mile for 2024) or actual expense method. Keep a detailed mileage log!

3. EQUIPMENT AND SOFTWARE
Section 179 allows you to deduct the full purchase price of qualifying equipment and software in the year you place it in service, rather than depreciating it over time.

4. BUSINESS MEALS AND ENTERTAINMENT
Business meals with clients are 50% deductible. While pure entertainment expenses are no longer deductible, meals during business discussions still qualify.

5. HEALTH INSURANCE PREMIUMS
Self-employed individuals can deduct health insurance premiums for themselves, their spouse, and dependents — even if they don't itemize other deductions.

6. RETIREMENT PLAN CONTRIBUTIONS
Contributions to SEP IRAs, SIMPLE IRAs, or Solo 401(k)s are deductible and help you save for retirement simultaneously.

NEED HELP? Contact Jackson Tax Service at 313-427-4856 to ensure you're claiming every deduction you deserve!`,
      author: "Austin Jackson",
      tags: JSON.stringify(["business", "deductions", "small-business", "tax-savings"]),
      isPublished: true,
      publishedAt: new Date("2025-03-10"),
    },
    {
      title: "Understanding Your Tax Bracket: A Simple Guide",
      slug: "understanding-tax-brackets",
      excerpt: "Tax brackets don't have to be confusing. Learn how they actually work and how to use this knowledge to your advantage.",
      content: `Tax brackets are one of the most misunderstood concepts in personal finance. Let's clear up the confusion.

HOW TAX BRACKETS REALLY WORK
The U.S. uses a progressive tax system, which means you pay different rates on different portions of your income. Contrary to popular belief, earning more money does NOT mean ALL your income is taxed at a higher rate.

EXAMPLE: SINGLE FILER 2024
- 10% on income up to $11,600
- 12% on income from $11,601 to $47,150
- 22% on income from $47,151 to $100,525
- And so on...

If you earn $60,000, you DON'T pay 22% on all $60,000. You pay:
- 10% on the first $11,600
- 12% on the next $35,550
- 22% on only the remaining $12,850

YOUR EFFECTIVE TAX RATE
Most people's effective tax rate (total tax paid ÷ total income) is much lower than their marginal rate (the rate on their last dollar earned).

STRATEGIC IMPLICATIONS
Understanding brackets helps with decisions like:
- Whether to do a Roth vs. Traditional retirement contribution
- When to realize capital gains
- How much to convert to a Roth IRA
- Timing of large deductions

For personalized tax planning, schedule a consultation with Jackson Tax Service today!`,
      author: "Austin Jackson",
      tags: JSON.stringify(["tax-basics", "education", "tax-brackets"]),
      isPublished: true,
      publishedAt: new Date("2025-04-05"),
    },
    {
      title: "IRS Payment Plans: What You Need to Know",
      slug: "irs-payment-plans",
      excerpt: "If you owe taxes you can't pay in full, the IRS offers payment plans. Here's everything you need to know about your options.",
      content: `Owing taxes to the IRS can be stressful, but the IRS offers several payment options to help taxpayers who can't pay in full.

SHORT-TERM PAYMENT PLAN (180 DAYS OR LESS)
- For balances under $100,000
- No setup fee
- Interest and penalties continue to accrue
- Can be set up online quickly

LONG-TERM INSTALLMENT AGREEMENT
- For balances over $10,000
- Setup fees range from $31 to $225 (reduced for low-income taxpayers)
- Monthly payments based on your financial situation
- Must stay current on future tax filings

OFFER IN COMPROMISE
- Settle your tax debt for less than you owe
- Requires demonstrating inability to pay full amount
- Complex application process — professional help recommended
- Not available if you can pay through an installment agreement

CURRENTLY NOT COLLECTIBLE STATUS
- If you can't pay any amount due to financial hardship
- IRS temporarily suspends collection activities
- Interest and penalties continue to accrue
- Must provide financial information to prove hardship

PENALTY ABATEMENT
- First-time penalty abatement available if you have a clean compliance history
- Reasonable cause abatement for circumstances beyond your control

IMPORTANT: The worst thing you can do is ignore IRS notices. Contact us at 313-427-4856 — we can help you navigate IRS payment options and negotiate on your behalf.`,
      author: "Austin Jackson",
      tags: JSON.stringify(["IRS", "payment-plans", "tax-debt", "tax-resolution"]),
      isPublished: true,
      publishedAt: new Date("2025-04-20"),
    },
    {
      title: "Year-Round Bookkeeping: Why Your Business Needs It",
      slug: "year-round-bookkeeping-guide",
      excerpt: "Stop scrambling at tax time. Here's how year-round bookkeeping saves you money, stress, and helps your business grow.",
      content: `Many small business owners treat bookkeeping as an annual event — something to think about only when tax season rolls around. But year-round bookkeeping offers enormous benefits:

1. REAL-TIME FINANCIAL INSIGHT
Monthly bookkeeping gives you a clear picture of your business's financial health. You can spot trends, identify issues early, and make informed decisions throughout the year.

2. STRESS-FREE TAX SEASON
When your books are up to date, tax preparation becomes straightforward. No scrambling to find receipts, no trying to remember business expenses from 11 months ago. Everything is organized and ready.

3. BETTER CASH FLOW MANAGEMENT
Regular bookkeeping helps you understand your cash flow patterns, anticipate slow periods, and plan for major expenses or investments.

4. EARLY PROBLEM DETECTION
Catching discrepancies, missing payments, or accounting errors early prevents small problems from becoming major headaches.

5. MORE ACCURATE DEDUCTIONS
When you track expenses in real time, you're less likely to miss deductible expenses. This alone often covers the cost of professional bookkeeping services.

OUR BOOKKEEPING SERVICES
At Jackson Tax Service, we offer comprehensive year-round bookkeeping starting at $200/month, including:
- Monthly account reconciliation
- Expense categorization
- Profit & Loss statements
- Balance sheet preparation
- Tax-ready records

Ready to get your books in order? Contact us at 313-427-4856 or schedule a consultation through Calendly!`,
      author: "Austin Jackson",
      tags: JSON.stringify(["bookkeeping", "small-business", "financial-management", "year-round"]),
      isPublished: true,
      publishedAt: new Date("2025-05-01"),
    },
  ] as any);
  console.log("✅ Blog posts seeded (6 total)");

  console.log("✅ Database seeded successfully!");
  console.log("");
  console.log("📋 Summary of seeded data:");
  console.log("   - 1 Admin user (ajackstaxservice@gmail.com / Admin@123456)");
  console.log("   - 1 Sample student (student@example.com / Student@123)");
  console.log("   - 4 Services");
  console.log("   - 10 FAQs across 5 categories");
  console.log("   - 7 Testimonials");
  console.log("   - 3 Learning bundles");
  console.log("   - 16 Training videos (7 Tax Fundamentals, 5 Business Strategy, 4 Advanced)");
  console.log("   - 2 Quizzes with sample questions");
  console.log("   - 6 Blog posts with full content");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});