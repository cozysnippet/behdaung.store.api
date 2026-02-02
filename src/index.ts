import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { Bindings } from './types';
import authRoute from './routes/auth.route';

const app = new Hono<{ Bindings: Bindings }>();

// Middleware
app.use('*', logger());
app.use('*', cors());

app.use('*', cors({
    origin: 'http://localhost:4200', // Allow your Angular app
    allowMethods: ['POST', 'GET', 'OPTIONS'],
}))

// Routes
app.route('/auth', authRoute);

app.get('/health', (c) => c.text('OK'));

export default app;