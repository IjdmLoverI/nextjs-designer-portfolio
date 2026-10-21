export const site = {
  name: "Lena Moroz",
  role: "Product designer",
  description:
    "Product designer working on fintech, booking and data-heavy dashboards. Selected case studies, process and contact.",
  email: "hello@example.com",
};

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
