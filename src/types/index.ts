import { z } from 'zod';
import {ProductSchema} from "../schemas/product.schema";

// This creates a TypeScript type automatically from your schema
export type Product = z.infer<typeof ProductSchema>;

export const EnvSchema = z.object({
  DB: z.custom<D1Database>(),
  JWT_SECRET: z.string().min(10),
  GOOGLE_CLIENT_ID: z.string(),
});

export type Bindings = z.infer<typeof EnvSchema>;