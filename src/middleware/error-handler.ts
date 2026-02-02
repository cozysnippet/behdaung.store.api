import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'

export const globalErrorHandler = (err: Error, c: Context) => {
  // Handle known HTTP exceptions (like 401 Unauthorized)
  if (err instanceof HTTPException) {
    return err.getResponse()
  }

  // Handle unexpected server errors
  console.error(`[ERROR]: ${err.stack}`)
  return c.json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  }, 500)
}