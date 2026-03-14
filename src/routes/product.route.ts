import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { ProductSchema, CreateProductSchema } from '../schemas/product.schema';
import { ProductService } from '../services/product.service';
import { Bindings } from '../types';

const productRoutes = new OpenAPIHono<{ Bindings: Bindings }>();

// 1. GET ALL
productRoutes.openapi(createRoute({
    method: 'get',
    path: '/',
    tags: ['Store'],
    responses: {
        200: {
            content: { 'application/json': { schema: z.array(ProductSchema) } },
            description: 'List of all products'
        }
    }
}), async (c) => {
    const service = new ProductService(c.env.DB);
    const products = await service.getAll();

    // Now TypeScript knows 'products' matches the schema perfectly
    return c.json(products, 200);
});

// 2. CREATE
productRoutes.openapi(createRoute({
    method: 'post',
    path: '/',
    tags: ['Store'],
    request: { body: { content: { 'application/json': { schema: CreateProductSchema } } } },
    responses: { 201: { content: { 'application/json': { schema: ProductSchema } }, description: 'Created' } }
}), async (c) => {
    const data = c.req.valid('json');
    const service = new ProductService(c.env.DB);
    const result = await service.create(data);
    return c.json(result, 201);
});

// 3. DELETE
productRoutes.openapi(createRoute({
    method: 'delete',
    path: '/{id}',
    tags: ['Store'],
    request: { params: z.object({ id: z.string() }) },
    responses: { 204: { description: 'Deleted' }, 404: { description: 'Not found' } }
}), async (c) => {
    const { id } = c.req.valid('param');
    const service = new ProductService(c.env.DB);
    const deleted = await service.delete(id);
    return deleted ? c.body(null, 204) : c.json({ message: 'Not found' }, 404);
});

export default productRoutes;