// src/controllers/user.controller.ts
import { Context } from 'hono'

export const getUser = async (c: Context) => {
    // Logic here
    return c.json({ message: "User data" })
}