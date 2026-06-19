# VIT Chennai Freshers Portal

A full-stack onboarding information portal for freshers joining VIT Chennai. Students can view induction schedules, registration steps, hostel details, proctor information, and contact details from a single dashboard.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui-style components
- **Backend:** Next.js API Routes, Prisma ORM, SQLite (PostgreSQL-ready schema)
- **Auth:** Not implemented yet — architecture prepared in `src/lib/auth/` and `src/middleware.ts`

## Features

- Dashboard landing page with summary cards, tabbed sections, and upcoming events timeline
- Dedicated pages for each onboarding section (sidebar navigation)
- Hidden admin panel at `/admin` with CRUD for all content
- REST API routes under `/api/*`
- Realistic seed data for immediate use after setup

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the student portal.

The seed runs automatically with `prisma migrate dev`. To re-seed manually:

```bash
npx prisma db seed
```

### Admin Panel

Visit [http://localhost:3000/admin](http://localhost:3000/admin) to manage portal content. No authentication is enforced yet — protect this route before deploying to production.

## Project Structure

```
src/
├── app/                    # App Router pages and API routes
│   ├── page.tsx            # Dashboard (landing page with tabs)
│   ├── admin/              # Admin CRUD pages
│   └── api/                # REST API endpoints
├── actions/                # Server actions for admin mutations
├── components/
│   ├── dashboard/          # Summary cards, timeline, tabs
│   ├── layout/             # Header, sidebar, app shell
│   ├── sections/           # Reusable section panels
│   └── ui/                 # shadcn-style UI primitives
├── lib/
│   ├── auth/               # Auth placeholder (future integration)
│   ├── data/               # Data access helpers
│   └── db.ts               # Prisma client singleton
prisma/
├── schema.prisma           # Database models
└── seed.ts                 # Sample data
```

## Database

SQLite is used for local development (`prisma/dev.db`). To migrate to PostgreSQL:

1. Change `provider` in `prisma/schema.prisma` from `sqlite` to `postgresql`
2. Update `DATABASE_URL` in `.env` to your PostgreSQL connection string
3. Run `npx prisma migrate dev`

No model changes are required.

## API Routes

| Route | Description |
|-------|-------------|
| `GET /api/events` | All events |
| `GET /api/proctors` | All proctors |
| `GET /api/course-registration` | Course registration info |
| `GET /api/transport` | Transport information |
| `GET /api/hostel` | Hostel information |
| `GET /api/contacts` | Contact details |

## Future Authentication

When adding auth:

1. Implement session logic in `src/lib/auth/index.ts`
2. Protect `/admin` routes in `src/middleware.ts`
3. Optionally gate content by student role in server components and actions

## License

MIT
