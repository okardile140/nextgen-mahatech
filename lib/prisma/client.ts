// RUNTIME Prisma client used by the Next.js app.
//
// In production, delete this file and let `npx prisma generate` pull types
// from `@prisma/client` (see lib/prisma.ts). This in-memory fallback keeps the
// application buildable and runnable without a live PostgreSQL database so the
// full stack (App Router + API routes + Prisma) can be demonstrated.

import { services, testimonials } from "../seed-data";

export interface PrismaClientOptions {
  log?: Array<"query" | "info" | "warn" | "error">;
  adapter?: unknown;
}

class ServiceQuery {
  findMany(args?: { where?: { active?: boolean }; orderBy?: unknown }): Promise<any[]> {
    void args;
    const rows = services
      .map((s) => ({ ...s, tagline: s.tagline ?? null, icon: s.icon ?? null }))
      .sort((a, b) => a.sortOrder - b.sortOrder);
    return Promise.resolve(rows);
  }
}

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
