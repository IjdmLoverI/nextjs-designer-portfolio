# Designer portfolio on Next.js

A personal portfolio for a product designer: home page with featured work, a grid of case studies, a page for every case study, an about page and a contact form. The designer and the case studies are sample content.

**Live demo:** see the link in the repository description.

| | |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, light and dark theme from the system setting |
| Content | One MDX file per case study in `src/content/projects` |
| Motion | `motion` (Framer Motion) page transitions and scroll reveals, off when the visitor prefers reduced motion |
| Contact | Server action with `zod` validation, email through Resend |
| SEO | Metadata per page, Open Graph image per case study, `sitemap.xml`, `robots.txt` |
| Tests | Playwright on desktop and mobile, axe accessibility checks, GitHub Actions |

## Run it

```bash
npm install
npm run dev
```

The site opens at http://localhost:3000.

## Add a case study

1. Create `src/content/projects/<slug>.mdx`. The file name becomes the URL: `/projects/<slug>`.
2. Start it with the metadata block, then write the story in Markdown:

   ```mdx
   export const metadata = {
     title: "Project title",
     summary: "One or two sentences for the card and search engines.",
     client: "Client name",
     role: "Your role",
     year: 2026,
     tags: ["Mobile app", "Research"],
     cover: "/projects/<slug>/cover.jpg",
     accent: "#2f5d50",
     featured: true,
     order: 4,
   };

   ## The problem

   Text, lists, quotes and images in plain Markdown.

   <Stats items={[{ value: "4 min", label: "to the first invoice" }]} />
   ```

3. Put the cover image in `public/projects/<slug>/`.

That is all: the grid, the case study page, its Open Graph image and the sitemap pick it up on the next build. `featured: true` also shows it on the home page; `order` sets the position.

## Contact form

Without settings the form validates and answers in demo mode. To deliver messages, create a free [Resend](https://resend.com) account, verify a sending domain and set:

| Variable | Example |
| --- | --- |
| `RESEND_API_KEY` | `re_...` |
| `CONTACT_TO_EMAIL` | where enquiries should arrive |
| `CONTACT_FROM_EMAIL` | `Portfolio <hello@your-domain.com>` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com`, used in the sitemap and Open Graph links |

Locally they go into `.env.local` (see `.env.example`); on Vercel into Project Settings → Environment Variables.

## Checks

```bash
npm run lint
npm run typecheck
npm run e2e        # builds the site, then runs Playwright on desktop and mobile
```

To run the end-to-end tests with an installed Chrome instead of Playwright's Chromium, set `PW_CHANNEL=chrome`.

## Deploy

Import the repository in Vercel, or run `npx vercel --prod`. No database or other services are needed.

## License

MIT
