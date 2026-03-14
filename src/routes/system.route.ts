import { createRoute, OpenAPIHono } from '@hono/zod-openapi'

const systemRoutes = new OpenAPIHono()

systemRoutes.openapi(
    createRoute({
        method: 'get',
        path: '/health',
        tags: ['System'], // This groups it in a "System" section in Swagger
        responses: {
            200: { description: 'System is online' }
        }
    }),
    (c) => c.text('OK')
)

export default systemRoutes