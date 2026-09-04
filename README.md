# NextGen MahaTech

> **Innovate • Build • Elevate**
> Smart Technology. Reliable Solutions. Business Growth.

Corporate website and **Association Management Solution (AMS)** product site for
NextGen MahaTech, Nashik.

**Next.js 15 (App Router)** · **TypeScript** · **Tailwind CSS v4** ·
**Prisma** · **PostgreSQL** · **Three.js** · **Motion**

---

## ⚠️ One required change before running

This project was scaffolded in an environment that pinned the npm scripts to
Vite. All Vite files have been deleted, but `package.json` could not be edited
from inside that sandbox. **Replace the `scripts` block** with:

```json
{
  "name": "nextgen-mahatech",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "prisma generate"
  }
}
```

Then remove the leftover Vite packages:

```bash
npm uninstall vite @vitejs/plugin-react vite-plugin-singlefile @tailwindcss/vite
```

Nothing in `app/`, `components/`, `lib/` or `prisma/` needs to change.

---

## Project structure

```
app/                          App Router — routes, layouts, API
├─ layout.tsx                 Root layout (Navbar + Footer + metadata + font)
├─ globals.css                Tailwind v4 entry, tokens, keyframes
├─ page.tsx                   /                  Home
├─ not-found.tsx              404 boundary
├─ error.tsx                  Error boundary
├─ about/page.tsx             /about
├─ services/page.tsx          /services
├─ portfolio/page.tsx         /portfolio
├─ solutions/ams/page.tsx     /solutions/ams     Association Management Solution
└─ api/                       Route Handlers
   ├─ enquiries/route.ts         POST (validate-only, no storage)
   ├─ services/route.ts          GET · POST
   ├─ services/[id]/route.ts     GET · PATCH · DELETE
   ├─ portfolio/route.ts         GET · POST
   ├─ portfolio/[id]/route.ts    GET · PATCH · DELETE
   ├─ ams-features/route.ts      GET · POST
   ├─ ams-features/[id]/route.ts GET · PATCH · DELETE
   ├─ testimonials/route.ts      GET · POST
   ├─ testimonials/[id]/route.ts GET · PATCH · DELETE
   ├─ team/route.ts              GET · POST
   └─ team/[id]/route.ts         GET · PATCH · DELETE

components/                   Server by default; interactive ones use "use client"
├─ Navbar · Footer · Hero · Hero3DCanvas · About · Services · Process
├─ Portfolio · Testimonials · CTA · Contact · TrustBar · PageBanner
├─ AMSHighlight · VisionMission
├─ about/       Story · Values · Team · Timeline
├─ services/    Grid · Process · Stack
├─ portfolio/   Grid · Why
├─ ams/         Hero · Metrics · Challenges · Benefits · Features · Why
│               Slogan
└─ ui/          AppLink

lib/
├─ prisma.ts                  PrismaClient singleton
├─ anim.tsx                   3D primitives — Reveal3D · Tilt · Flip3D
├─ types.ts · ams-data.tsx · services-data.tsx · seed-data.ts

prisma/schema.prisma          PostgreSQL schema
next.config.mjs               Next.js config
postcss.config.mjs            Tailwind v4 via PostCSS
```

No `src/`, no Vite, no React-Vite scaffolding.

---

## Getting started

```bash
npm install

cp .env.example .env
# DATABASE_URL="postgresql://user:password@localhost:5432/nextgen_mahatech"

npx prisma generate
npx prisma migrate dev --name init

npm run dev          # http://localhost:3000
```

### Production

```bash
npm run build
npm run start
```

---

## Styling

Tailwind CSS v4 is wired through `postcss.config.mjs`, which Next.js reads
automatically:

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

---

## API reference

| Method   | Endpoint              | Description                    |
| -------- | --------------------- | ------------------------------ |
| `POST`   | `/api/enquiries`      | Validate contact-form payload (nothing stored) |
| `GET`    | `/api/services`       | List active services (`?all=1` incl. hidden — admin) |
| `POST`   | `/api/services`       | Create a service (admin)       |
| `GET`/`PATCH`/`DELETE` | `/api/services/[id]` | Read, update, delete one service (admin) |
| `GET`    | `/api/portfolio`      | List active portfolio items (`?all=1` incl. hidden — admin) |
| `POST`   | `/api/portfolio`      | Create a portfolio item (admin) |
| `GET`/`PATCH`/`DELETE` | `/api/portfolio/[id]` | Read, update, delete one item (admin) |
| `GET`    | `/api/ams-features`   | List AMS product features      |
| `POST`   | `/api/ams-features`   | Create an AMS feature (admin)  |
| `GET`/`PATCH`/`DELETE` | `/api/ams-features/[id]` | Read, update, delete one feature (admin) |
| `GET`    | `/api/testimonials`   | List active testimonials (`?all=1` incl. hidden — admin) |
| `POST`   | `/api/testimonials`   | Create a testimonial (admin) |
| `GET`/`PATCH`/`DELETE` | `/api/testimonials/[id]` | Read, update, delete one testimonial (admin) |
| `GET`    | `/api/team`           | List active team members (`?all=1` incl. hidden — admin) |
| `POST`   | `/api/team`           | Create a team member (admin) |
| `GET`/`PATCH`/`DELETE` | `/api/team/[id]` | Read, update, delete one member (admin) |
| `GET`    | `/api/services`       | Service catalogue              |
| `GET`    | `/api/testimonials`   | Published testimonials         |

---

## Admin panel

Open **`/admin`** (passcode gate — default `admin123`, override with
`NEXT_PUBLIC_ADMIN_KEY` in `.env`). From there you can **add, edit and
delete**:

- **Services** → shown on `/services` and the home page cards
- **Portfolio** → shown in the showcase on `/portfolio`
- **AMS Features** → shown in the features grid on `/solutions/ams`
- **Testimonials** → shown in the client-stories section on the home page

Edits go live instantly. In this preview the store is in-memory, so changes
reset when the server restarts — connect PostgreSQL (`DATABASE_URL` +
`npx prisma migrate dev`) for permanent storage.

## Contact

**NextGen MahaTech**
Shree Ganesh Park, Near Patil Park, Jadhav Township,
Ambad Link Road, Nashik – 422010, Maharashtra, India

📞 9579495373 · ✉️ nextgenmahatech@gmail.com · 🌐 www.nextgenmahatech.com
s