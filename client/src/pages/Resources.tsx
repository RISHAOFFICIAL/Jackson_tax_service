import { useState } from "react";
import { Calendar, ArrowRight, Tag, Calculator, BookOpen, FileText } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { formatDate } from "../lib/utils";

// Sample blog posts (in production, fetched from API)
const blogPosts = [
  {
    id: 1,
    title: "5 Essential Tax Tips for Freelancers in 2025",
    slug: "tax-tips-freelancers-2025",
    excerpt: "Navigate self-employment taxes with confidence. Here are the top tips every freelancer should know to maximize deductions and minimize stress.",
    author: "Austin Jackson",
    date: "2025-01-15",
    tags: ["Freelancer", "Self-Employment", "Tax Tips"],
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "When Should You Start Planning for Tax Season?",
    slug: "when-to-plan-tax-season",
    excerpt: "The best time to prepare for tax season might surprise you. Year-round planning saves money and reduces stress come April.",
    author: "Austin Jackson",
    date: "2025-02-01",
    tags: ["Tax Planning", "Preparation"],
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Common Tax Deductions for Small Business Owners",
    slug: "common-business-tax-deductions",
    excerpt: "Don't miss these valuable deductions that could save your business thousands of dollars this tax season.",
    author: "Austin Jackson",
    date: "2025-03-10",
    tags: ["Business", "Deductions", "Small Business"],
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Understanding Your Tax Bracket: A Simple Guide",
    slug: "understanding-tax-brackets",
    excerpt: "Tax brackets don't have to be confusing. Learn how they work and how to use this knowledge to your advantage.",
    author: "Austin Jackson",
    date: "2025-04-05",
    tags: ["Tax Basics", "Education"],
    readTime: "3 min read",
  },
  {
    id: 5,
    title: "IRS Payment Plans: What You Need to Know",
    slug: "irs-payment-plans",
    excerpt: "If you owe taxes you can't pay, the IRS offers payment plans. Here's how to navigate the options available.",
    author: "Austin Jackson",
    date: "2025-04-20",
    tags: ["IRS", "Payment Plans", "Tax Debt"],
    readTime: "4 min read",
  },
];

const resources = [
  {
    icon: Calculator,
    title: "Tax Calculator",
    description: "Estimate your tax refund or amount owed with our simple tax calculator.",
    link: "#",
  },
  {
    icon: BookOpen,
    title: "Tax Guides",
    description: "Comprehensive guides covering tax basics, deductions, and filing requirements.",
    link: "#",
  },
  {
    icon: FileText,
    title: "Document Checklist",
    description: "What documents you need to bring for a smooth tax preparation experience.",
    link: "#",
  },
];

export default function Resources() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Tax Resources
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Educational content, tax tips, and tools to help you make informed financial decisions.
          </p>
        </div>
      </section>

      {/* Resources Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            Helpful Tools & Guides
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <Card key={resource.title} className="hover:shadow-xl transition-shadow group">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <resource.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  <a href={resource.link} className="text-gold font-semibold text-sm hover:text-gold-dark transition inline-flex items-center">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary mb-4 text-center">
            Latest Articles
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Stay informed with the latest tax news, tips, and advice from our team.
          </p>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </span>
                    <span>{post.readTime}</span>
                    <span>By {post.author}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`#${post.slug}`}
                      className="text-gold font-semibold text-sm hover:text-gold-dark transition inline-flex items-center"
                    >
                      Read Full Article <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated With Tax Tips
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to our newsletter for the latest tax news, tips, and updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-gold"
            />
            <Button variant="gold">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}