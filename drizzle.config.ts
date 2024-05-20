import type { Config } from 'drizzle-kit';
export default {
  schema: './src/postgresql-drizzle/schema.ts',
  out: './src/postgresql-drizzle/migrations',
  breakpoints: true,
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgres://postgres:password@localhost:5430/psi',
  },
  strict: true,
  introspect: { casing: 'camel' },
} satisfies Config;
