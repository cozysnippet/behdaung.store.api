import { Hono } from 'hono';
import { Bindings } from '../types';
import { AuthService } from '../services/auth.service';

const auth = new Hono<{ Bindings: Bindings }>();
const authService = new AuthService(); // Instance of our service

auth.post('/google', async (c) => {
    try {
        const { idToken } = await c.req.json();

        if (!idToken) {
            return c.json({ error: 'Missing idToken' }, 400);
        }

        // Call the service (just like calling a Spring @Service)
        const result = await authService.verifyAndAuthenticate(idToken, c.env);

        return c.json(result);
    } catch (error: any) {
        console.error("Auth Error:", error.message);
        return c.json({ error: 'Unauthorized', message: error.message }, 401);
    }
});

export default auth;