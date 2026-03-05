import { getPayload } from "payload";
import config from "@/payload.config";
import "dotenv/config";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Business & Money",
    color: "#FFB347",
    slug: "business-money",
    subcategories: [
      { name: "Accounting", slug: "accounting" },
      {
        name: "Entrepreneurship",
        slug: "entrepreneurship",
      },
      { name: "Gigs & Side Projects", slug: "gigs-side-projects" },
      { name: "Investing", slug: "investing" },
      { name: "Management & Leadership", slug: "management-leadership" },
      {
        name: "Marketing & Sales",
        slug: "marketing-sales",
      },
      { name: "Networking, Careers & Jobs", slug: "networking-careers-jobs" },
      { name: "Personal Finance", slug: "personal-finance" },
      { name: "Real Estate", slug: "real-estate" },
    ],
  },
  {
    name: "Software Development",
    color: "#7EC8E3",
    slug: "software-development",
    subcategories: [
      { name: "Web Development", slug: "web-development" },
      { name: "Mobile Development", slug: "mobile-development" },
      { name: "Game Development", slug: "game-development" },
      { name: "Programming Languages", slug: "programming-languages" },
      { name: "DevOps", slug: "devops" },
    ],
  },
  {
    name: "Writing & Publishing",
    color: "#D8B5FF",
    slug: "writing-publishing",
    subcategories: [
      { name: "Fiction", slug: "fiction" },
      { name: "Non-Fiction", slug: "non-fiction" },
      { name: "Blogging", slug: "blogging" },
      { name: "Copywriting", slug: "copywriting" },
      { name: "Self-Publishing", slug: "self-publishing" },
    ],
  },
  {
    name: "Other",
    slug: "other",
  },
  {
    name: "Education",
    color: "#FFE066",
    slug: "education",
    subcategories: [
      { name: "Online Courses", slug: "online-courses" },
      { name: "Tutoring", slug: "tutoring" },
      { name: "Test Preparation", slug: "test-preparation" },
      { name: "Language Learning", slug: "language-learning" },
    ],
  },
  {
    name: "Self Improvement",
    color: "#96E6B3",
    slug: "self-improvement",
    subcategories: [
      { name: "Productivity", slug: "productivity" },
      { name: "Personal Development", slug: "personal-development" },
      { name: "Mindfulness", slug: "mindfulness" },
      { name: "Career Growth", slug: "career-growth" },
    ],
  },
  {
    name: "Fitness & Health",
    color: "#FF9AA2",
    slug: "fitness-health",
    subcategories: [
      { name: "Workout Plans", slug: "workout-plans" },
      { name: "Nutrition", slug: "nutrition" },
      { name: "Mental Health", slug: "mental-health" },
      { name: "Yoga", slug: "yoga" },
    ],
  },
  {
    name: "Design",
    color: "#B5B9FF",
    slug: "design",
    subcategories: [
      { name: "UI/UX", slug: "ui-ux" },
      { name: "Graphic Design", slug: "graphic-design" },
      { name: "3D Modeling", slug: "3d-modeling" },
      { name: "Typography", slug: "typography" },
    ],
  },
  {
    name: "Drawing & Painting",
    color: "#FFCAB0",
    slug: "drawing-painting",
    subcategories: [
      { name: "Watercolor", slug: "watercolor" },
      { name: "Acrylic", slug: "acrylic" },
      { name: "Oil", slug: "oil" },
      { name: "Pastel", slug: "pastel" },
      { name: "Charcoal", slug: "charcoal" },
    ],
  },
  {
    name: "Music",
    color: "#FFD700",
    slug: "music",
    subcategories: [
      { name: "Songwriting", slug: "songwriting" },
      { name: "Music Production", slug: "music-production" },
      { name: "Music Theory", slug: "music-theory" },
      { name: "Music History", slug: "music-history" },
    ],
  },
  {
    name: "Photography",
    color: "#FF6B6B",
    slug: "photography",
    subcategories: [
      { name: "Portrait", slug: "portrait" },
      { name: "Landscape", slug: "landscape" },
      { name: "Street Photography", slug: "street-photography" },
      { name: "Nature", slug: "nature" },
      { name: "Macro", slug: "macro" },
    ],
  },
];

const tenants = [
  {
    name: "CodeCraft Studio",
    slug: "codecraft-studio",
    stripeAccountId: "acct_seed_codecraft",
  },
  {
    name: "Pixel Forge",
    slug: "pixel-forge",
    stripeAccountId: "acct_seed_pixelforge",
  },
  {
    name: "Growth Sprint",
    slug: "growth-sprint",
    stripeAccountId: "acct_seed_growthsprint",
  },
];

const tags = [
  "Course",
  "Template",
  "Notion",
  "Figma",
  "Bundle",
  "Marketing",
  "Productivity",
  "Design",
  "Photography",
  "Audio",
];

const products = [
  {
    name: "Next.js SaaS Starter Kit",
    price: 89,
    categorySlug: "web-development",
    tenantSlug: "codecraft-studio",
    tags: ["Course", "Template", "Bundle"],
    refundPolicy: "14-days",
  },
  {
    name: "TypeScript API Architecture Playbook",
    price: 59,
    categorySlug: "programming-languages",
    tenantSlug: "codecraft-studio",
    tags: ["Course", "Productivity"],
    refundPolicy: "30-days",
  },
  {
    name: "Fullstack DevOps Deployment Guide",
    price: 75,
    categorySlug: "devops",
    tenantSlug: "codecraft-studio",
    tags: ["Course", "Bundle"],
    refundPolicy: "14-days",
  },
  {
    name: "Figma UI Kit for Marketplace Apps",
    price: 42,
    categorySlug: "ui-ux",
    tenantSlug: "pixel-forge",
    tags: ["Figma", "Design", "Template"],
    refundPolicy: "7-days",
  },
  {
    name: "Design System Starter for React",
    price: 65,
    categorySlug: "graphic-design",
    tenantSlug: "pixel-forge",
    tags: ["Template", "Design", "Bundle"],
    refundPolicy: "14-days",
  },
  {
    name: "Typography Pairing Handbook",
    price: 29,
    categorySlug: "typography",
    tenantSlug: "pixel-forge",
    tags: ["Design", "Course"],
    refundPolicy: "7-days",
  },
  {
    name: "Notion Creator Business OS",
    price: 39,
    categorySlug: "productivity",
    tenantSlug: "growth-sprint",
    tags: ["Notion", "Productivity", "Template"],
    refundPolicy: "30-days",
  },
  {
    name: "Launch Strategy for Digital Products",
    price: 54,
    categorySlug: "marketing-sales",
    tenantSlug: "growth-sprint",
    tags: ["Marketing", "Course"],
    refundPolicy: "14-days",
  },
  {
    name: "Personal Finance Spreadsheet Pack",
    price: 33,
    categorySlug: "personal-finance",
    tenantSlug: "growth-sprint",
    tags: ["Template", "Productivity"],
    refundPolicy: "30-days",
  },
  {
    name: "Portrait Photography Preset Collection",
    price: 27,
    categorySlug: "portrait",
    tenantSlug: "pixel-forge",
    tags: ["Photography", "Bundle"],
    refundPolicy: "7-days",
  },
  {
    name: "Music Production Workflow Templates",
    price: 36,
    categorySlug: "music-production",
    tenantSlug: "codecraft-studio",
    tags: ["Audio", "Template"],
    refundPolicy: "14-days",
  },
  {
    name: "Creator Growth Metrics Dashboard",
    price: 49,
    categorySlug: "entrepreneurship",
    tenantSlug: "growth-sprint",
    tags: ["Notion", "Marketing", "Template"],
    refundPolicy: "14-days",
  },
] as const;

const seed = async () => {
  const payload = await getPayload({ config });

  const adminUser = await payload.create({
    collection: "users",
    data: {
      email: "admin@demo.com",
      password: "demo",
      roles: ["super-admin"],
      username: "admin",
    },
  });

  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });

    for (const subCategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subCategory.name,
          slug: subCategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }

  const createdTenants = await Promise.all(
    tenants.map((tenant) =>
      payload.create({
        collection: "tenants",
        data: {
          name: tenant.name,
          slug: tenant.slug,
          stripeAccountId: tenant.stripeAccountId,
          stripeDetailsSubmitted: true,
        },
      }),
    ),
  );

  const tenantMap = new Map(createdTenants.map((tenant) => [tenant.slug, tenant.id]));

  const createdTags = await Promise.all(
    tags.map((tag) =>
      payload.create({
        collection: "tags",
        data: {
          name: tag,
        },
      }),
    ),
  );

  const tagMap = new Map(createdTags.map((tag) => [tag.name, tag.id]));

  const categorySlugs = [...new Set(products.map((product) => product.categorySlug))];
  const categoriesData = await payload.find({
    collection: "categories",
    depth: 0,
    limit: categorySlugs.length,
    pagination: false,
    where: {
      slug: {
        in: categorySlugs,
      },
    },
  });

  const categoryMap = new Map(
    categoriesData.docs.map((category) => [category.slug, category.id]),
  );

  for (const product of products) {
    const tenantId = tenantMap.get(product.tenantSlug);
    const categoryId = categoryMap.get(product.categorySlug);

    if (!tenantId || !categoryId) {
      continue;
    }

    await payload.create({
      collection: "products",
      data: {
        name: product.name,
        price: product.price,
        tenant: tenantId,
        category: categoryId,
        tags: product.tags
          .map((tag) => tagMap.get(tag))
          .filter((tag): tag is string => Boolean(tag)),
        refundPolicy: product.refundPolicy,
        isArchived: false,
        isPrivate: false,
      },
    });
  }

  const seededProducts = await payload.find({
    collection: "products",
    depth: 0,
    limit: 6,
    sort: "-createdAt",
  });

  for (const product of seededProducts.docs) {
    await payload.create({
      collection: "reviews",
      data: {
        description: `Great value product for ${product.name}`,
        rating: Math.floor(Math.random() * 2) + 4,
        product: product.id,
        user: adminUser.id,
      },
    });
  }
};

try {
  await seed();
  process.exit(0);
} catch (error) {
  console.error("error seeding data", error);
  process.exit(1);
}
