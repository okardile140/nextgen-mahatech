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
├─ industries/page.tsx        /industries
├─ solutions/ams/page.tsx     /solutions/ams     Association Management Solution
└─ api/                       Route Handlers
   ├─ enquiries/route.ts         POST (validate-only, no storage)
   ├─ services/route.ts          GET
   └─ testimonials/route.ts      GET

components/                   Server by default; interactive ones use "use client"
├─ Navbar · Footer · Hero · Hero3DCanvas · About · Services · Process
├─ Industries · Testimonials · CTA · Contact · TrustBar · PageBanner
├─ AMSHighlight · VisionMission
├─ about/       Story · Values · Team · Timeline
├─ services/    Grid · Process · Stack
├─ industries/  Grid · Why
├─ ams/         Hero · Metrics · Challenges · Benefits · Features · Why
│               Slogan · DashboardMockup
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
| `POST`   | `/api/enquiries`      | Validate contact-form payload (nothing stored — no admin panel) |
| `GET`    | `/api/services`       | Service catalogue              |
| `GET`    | `/api/testimonials`   | Published testimonials         |

---

## Contact

**NextGen MahaTech**
Shree Ganesh Park, Near Patil Park, Jadhav Township,
Ambad Link Road, Nashik – 422010, Maharashtra, India

📞 9579495373 · ✉️ nextgenmahatech@gmail.com · 🌐 www.nextgenmahatech.com
s