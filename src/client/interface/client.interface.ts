import { clients } from '../../postgresql-drizzle/schema';

export type Client = typeof clients.$inferSelect;
