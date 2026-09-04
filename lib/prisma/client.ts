// RUNTIME Prisma client used by the Next.js app.
//
// In production, delete this file and let `npx prisma generate` pull types
// from `@prisma/client` (see lib/prisma.ts). This in-memory fallback keeps the
// application buildable and runnable without a live PostgreSQL database so the
// full stack (App Router + API routes + admin CRUD) can be demonstrated.
//
// NOTE: data lives in module-level arrays, so admin edits apply instantly to
// every page — but they reset when the server restarts. For permanent storage,
// point DATABASE_URL at PostgreSQL and migrate (see prisma/schema.prisma).

import { portfolioItems, testimonials } from "../seed-data";
import { serviceDetails } from "../services-data";
import { amsFeatures } from "../ams-data";

export interface PrismaClientOptions {
  log?: Array<"query" | "info" | "warn" | "error">;
  adapter?: unknown;
}

const now = () => new Date();
const uid = (prefix: string) =>
  `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `item-${Date.now().toString(36)}`
  );
}

type ServiceRow = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string;
  longDescription: string | null;
  icon: string | null;
  tone: string | null;
  features: string[];
  deliverables: string[];
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

type PortfolioRow = {
  id: string;
  title: string;
  category: string | null;
  description: string;
  image: string | null;
  link: string | null;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

type AmsFeatureRow = {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  tone: string | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

const bySort = (a: { sortOrder: number }, b: { sortOrder: number }) => a.sortOrder - b.sortOrder;

// ---------------------------------------------------------------------------
// Services — seeded from the rich catalogue in lib/services-data
// ---------------------------------------------------------------------------
const serviceRows: ServiceRow[] = serviceDetails.map((s, i) => ({
  id: `svc-${s.slug}`,
  slug: s.slug,
  title: s.title,
  tagline: s.tagline,
  description: s.description,
  longDescription: s.longDescription,
  icon: s.icon,
  tone: s.tone,
  features: [...s.features],
  deliverables: [...s.deliverables],
  active: true,
  sortOrder: i + 1,
  createdAt: now(),
  updatedAt: now(),
}));

class ServiceQuery {
  async findMany(args?: { where?: { active?: boolean } }): Promise<ServiceRow[]> {
    const rows =
      args?.where?.active === undefined
        ? [...serviceRows]
        : serviceRows.filter((r) => r.active === args.where!.active);
    return rows.sort(bySort);
  }
  async findUnique(args: { where: { id: string } }): Promise<ServiceRow | null> {
    return serviceRows.find((r) => r.id === args.where.id) ?? null;
  }
  async create(args: { data: Partial<ServiceRow> & { title: string } }): Promise<ServiceRow> {
    const d = args.data;
    const title = String(d.title).trim();
    const row: ServiceRow = {
      id: uid("svc"),
      slug: d.slug?.trim() || slugify(title),
      title,
      tagline: d.tagline?.trim() ? String(d.tagline) : null,
      description: String(d.description ?? "").trim(),
      longDescription: d.longDescription?.trim() ? String(d.longDescription) : null,
      icon: d.icon?.trim() ? String(d.icon) : null,
      tone: d.tone?.trim() ? String(d.tone) : null,
      features: Array.isArray(d.features) ? d.features.map(String) : [],
      deliverables: Array.isArray(d.deliverables) ? d.deliverables.map(String) : [],
      active: d.active !== false,
      sortOrder:
        typeof d.sortOrder === "number" && Number.isFinite(d.sortOrder)
          ? d.sortOrder
          : serviceRows.length + 1,
      createdAt: now(),
      updatedAt: now(),
    };
    serviceRows.push(row);
    return row;
  }
  async update(args: { where: { id: string }; data: Partial<ServiceRow> }): Promise<ServiceRow> {
    const row = serviceRows.find((r) => r.id === args.where.id);
    if (!row) throw new Error(`Service ${args.where.id} not found`);
    const d = args.data;
    if (d.title !== undefined) {
      row.title = String(d.title).trim() || row.title;
      if (d.slug === undefined) row.slug = slugify(row.title);
    }
    if (d.slug !== undefined && String(d.slug).trim()) row.slug = slugify(String(d.slug));
    if (d.tagline !== undefined) row.tagline = String(d.tagline).trim() || null;
    if (d.description !== undefined) row.description = String(d.description);
    if (d.longDescription !== undefined) row.longDescription = String(d.longDescription).trim() || null;
    if (d.icon !== undefined) row.icon = String(d.icon).trim() || null;
    if (d.tone !== undefined) row.tone = String(d.tone).trim() || null;
    if (d.features !== undefined) row.features = Array.isArray(d.features) ? d.features.map(String) : [];
    if (d.deliverables !== undefined)
      row.deliverables = Array.isArray(d.deliverables) ? d.deliverables.map(String) : [];
    if (d.active !== undefined) row.active = d.active !== false;
    if (d.sortOrder !== undefined && Number.isFinite(Number(d.sortOrder)))
      row.sortOrder = Number(d.sortOrder);
    row.updatedAt = now();
    return row;
  }
  async delete(args: { where: { id: string } }): Promise<ServiceRow> {
    const idx = serviceRows.findIndex((r) => r.id === args.where.id);
    if (idx === -1) throw new Error(`Service ${args.where.id} not found`);
    const [removed] = serviceRows.splice(idx, 1);
    return removed;
  }
}

// ---------------------------------------------------------------------------
// Portfolio — admin-managed showcase items
// ---------------------------------------------------------------------------
const portfolioRows: PortfolioRow[] = portfolioItems.map((p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  description: p.description,
  image: p.image,
  link: p.link,
  active: p.active,
  sortOrder: p.sortOrder,
  createdAt: now(),
  updatedAt: now(),
}));

class PortfolioQuery {
  async findMany(args?: { where?: { active?: boolean } }): Promise<PortfolioRow[]> {
    const rows =
      args?.where?.active === undefined
        ? [...portfolioRows]
        : portfolioRows.filter((r) => r.active === args.where!.active);
    return rows.sort(bySort);
  }
  async findUnique(args: { where: { id: string } }): Promise<PortfolioRow | null> {
    return portfolioRows.find((r) => r.id === args.where.id) ?? null;
  }
  async create(args: { data: Partial<PortfolioRow> & { title: string } }): Promise<PortfolioRow> {
    const d = args.data;
    const row: PortfolioRow = {
      id: uid("pf"),
      title: String(d.title).trim(),
      category: d.category?.trim() ? String(d.category) : null,
      description: String(d.description ?? "").trim(),
      image: d.image?.trim() ? String(d.image) : null,
      link: d.link?.trim() ? String(d.link) : null,
      active: d.active !== false,
      sortOrder:
        typeof d.sortOrder === "number" && Number.isFinite(d.sortOrder)
          ? d.sortOrder
          : portfolioRows.length + 1,
      createdAt: now(),
      updatedAt: now(),
    };
    portfolioRows.push(row);
    return row;
  }
  async update(args: { where: { id: string }; data: Partial<PortfolioRow> }): Promise<PortfolioRow> {
    const row = portfolioRows.find((r) => r.id === args.where.id);
    if (!row) throw new Error(`Portfolio item ${args.where.id} not found`);
    const d = args.data;
    if (d.title !== undefined && String(d.title).trim()) row.title = String(d.title).trim();
    if (d.category !== undefined) row.category = String(d.category).trim() || null;
    if (d.description !== undefined) row.description = String(d.description);
    if (d.image !== undefined) row.image = String(d.image).trim() || null;
    if (d.link !== undefined) row.link = String(d.link).trim() || null;
    if (d.active !== undefined) row.active = d.active !== false;
    if (d.sortOrder !== undefined && Number.isFinite(Number(d.sortOrder)))
      row.sortOrder = Number(d.sortOrder);
    row.updatedAt = now();
    return row;
  }
  async delete(args: { where: { id: string } }): Promise<PortfolioRow> {
    const idx = portfolioRows.findIndex((r) => r.id === args.where.id);
    if (idx === -1) throw new Error(`Portfolio item ${args.where.id} not found`);
    const [removed] = portfolioRows.splice(idx, 1);
    return removed;
  }
}

// ---------------------------------------------------------------------------
// AMS features — seeded from lib/ams-data
// ---------------------------------------------------------------------------
const amsFeatureRows: AmsFeatureRow[] = amsFeatures.map((f, i) => ({
  id: `amsf-${slugify(f.t)}`,
  title: f.t,
  description: f.d,
  icon: f.icon,
  tone: f.tone,
  sortOrder: i + 1,
  createdAt: now(),
  updatedAt: now(),
}));

class AmsFeatureQuery {
  async findMany(): Promise<AmsFeatureRow[]> {
    return [...amsFeatureRows].sort(bySort);
  }
  async findUnique(args: { where: { id: string } }): Promise<AmsFeatureRow | null> {
    return amsFeatureRows.find((r) => r.id === args.where.id) ?? null;
  }
  async create(args: { data: Partial<AmsFeatureRow> & { title: string } }): Promise<AmsFeatureRow> {
    const d = args.data;
    const row: AmsFeatureRow = {
      id: uid("amsf"),
      title: String(d.title).trim(),
      description: String(d.description ?? "").trim(),
      icon: d.icon?.trim() ? String(d.icon) : null,
      tone: d.tone?.trim() ? String(d.tone) : null,
      sortOrder:
        typeof d.sortOrder === "number" && Number.isFinite(d.sortOrder)
          ? d.sortOrder
          : amsFeatureRows.length + 1,
      createdAt: now(),
      updatedAt: now(),
    };
    amsFeatureRows.push(row);
    return row;
  }
  async update(args: { where: { id: string }; data: Partial<AmsFeatureRow> }): Promise<AmsFeatureRow> {
    const row = amsFeatureRows.find((r) => r.id === args.where.id);
    if (!row) throw new Error(`AMS feature ${args.where.id} not found`);
    const d = args.data;
    if (d.title !== undefined && String(d.title).trim()) row.title = String(d.title).trim();
    if (d.description !== undefined) row.description = String(d.description);
    if (d.icon !== undefined) row.icon = String(d.icon).trim() || null;
    if (d.tone !== undefined) row.tone = String(d.tone).trim() || null;
    if (d.sortOrder !== undefined && Number.isFinite(Number(d.sortOrder)))
      row.sortOrder = Number(d.sortOrder);
    row.updatedAt = now();
    return row;
  }
  async delete(args: { where: { id: string } }): Promise<AmsFeatureRow> {
    const idx = amsFeatureRows.findIndex((r) => r.id === args.where.id);
    if (idx === -1) throw new Error(`AMS feature ${args.where.id} not found`);
    const [removed] = amsFeatureRows.splice(idx, 1);
    return removed;
  }
}

// ---------------------------------------------------------------------------
// Testimonials + posts (read-only seeds, unchanged)
// ---------------------------------------------------------------------------
class TestimonialQuery {
  findMany(args?: { where?: { active?: boolean }; orderBy?: unknown }): Promise<any[]> {
    void args;
    return Promise.resolve(testimonials.map((t) => ({ ...t, active: true })));
  }
}

class PostQuery {
  findMany(): Promise<any[]> {
    return Promise.resolve([]);
  }
}

export class PrismaClient {
  readonly service = new ServiceQuery();
  readonly portfolio = new PortfolioQuery();
  readonly amsFeature = new AmsFeatureQuery();
  readonly testimonial = new TestimonialQuery();
  readonly post = new PostQuery();

  constructor(options: PrismaClientOptions = {}) {
    if (options.log) void options.log;
  }

  $connect(): Promise<void> {
    return Promise.resolve();
  }
  $disconnect(): Promise<void> {
    return Promise.resolve();
  }
}

export default PrismaClient;
