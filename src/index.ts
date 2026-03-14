import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

import { Bindings, EnvSchema } from './types';
import productRoutes from "./routes/product.route";
import systemRoutes from "./routes/system.route";

const app = new OpenAPIHono<{ Bindings: Bindings }>();

// Global Middleware
app.use('*', logger());
app.use('*', cors());

// Validate Environment Variables on every request
app.use('*', async (c, next) => {
    const parsed = EnvSchema.safeParse(c.env);
    if (!parsed.success) {
        return c.json({ error: "Config Error", details: parsed.error.format() }, 500);
    }
    await next();
});

// Global Error Handler (Industry Standard)
app.onError((err, c) => {
    console.error(err);
    return c.json({ success: false, message: err.message || 'Internal Server Error' }, 500);
});

// Routes
app.route('/products', productRoutes);
app.route('/', systemRoutes);

// Documentation
app.doc('/doc', {
    openapi: '3.0.0',
    info: { title: 'Behdaung Store API', version: '1.0.0' },
});

app.get('/ui', swaggerUI({ url: '/doc' }));

export default app;