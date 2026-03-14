import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { UserSchema } from '../schemas/user.schema'
import { z } from 'zod'

const userRoutes = new OpenAPIHono()

// 1. Define the API Contract
export const getUserRoute = createRoute({
  method: 'get',
  path: '/{id}',
  request: {
    params: z.object({
      id: z.string().min(3).openapi({ example: '1212121' })
    }),
  },
  responses: {
    200: {
      content: { 'application/json': { schema: UserSchema } },
      description: 'Retrieve the user details',
    },
    404: { description: 'User not found' }
  },
})

// 2. Implement the logic
userRoutes.openapi(getUserRoute, (c) => {
  const { id } = c.req.valid('param')
  // In a real app, call your userService.getUserById(id) here
  return c.json({
    id,
    age: 20,
    name: 'Ultra-man',
  })
})

export default userRoutes