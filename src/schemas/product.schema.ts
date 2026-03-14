import { z } from '@hono/zod-openapi'

export const ProductSchema = z.object({
    id: z.string().openapi({ example: 'prod_123' }),
    name: z.string().min(2).openapi({ example: 'Vintage Denim Jacket' }),
    description: z.string().openapi({ example: '100% organic cotton' }),
    price: z.number().positive().openapi({ example: 89.99 }),
    category: z.string().openapi({ example: 'Tops' }),
    stock: z.number().int().min(0).openapi({ example: 10 }),
    imageUrl: z.string().url().openapi({ example: 'https://images.com/jacket.jpg' }),
}).openapi('Product')

export const CreateProductSchema = ProductSchema.omit({ id: true })
export const ErrorSchema = z.object({
    success: z.boolean().openapi({ example: false }),
    message: z.string().openapi({ example: 'Not found' }),
}).openapi('Error')