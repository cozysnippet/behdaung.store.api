import { OAuth2Client } from "google-auth-library";
import { sign } from 'hono/jwt';
import { Bindings } from '../types';

export class AuthService {
    private googleClient: OAuth2Client;

    constructor() {
        this.googleClient = new OAuth2Client();
    }

    /**
     * Orchestrates the Google Auth Flow:
     * 1. Verifies the ID Token from Google
     * 2. Extracts user information
     * 3. Generates a local application JWTb
     */
    async verifyAndAuthenticate(idToken: string, env: Bindings) {
        // 1. Verify with Google (The "Trust" step)
        const ticket = await this.googleClient.verifyIdToken({
            idToken,
            audience: env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            throw new Error("Invalid Google Identity");
        }

        // 2. Generate Local JWT (The "Session" step)
        // Similar to Spring Security's Authentication object
        const token = await sign(
            {
                sub: payload.sub,
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 hours
            },
            env.JWT_SECRET
        );

        return {
            token,
            user: {
                email: payload.email,
                name: payload.name,
                picture: payload.picture
            }
        };
    }
}