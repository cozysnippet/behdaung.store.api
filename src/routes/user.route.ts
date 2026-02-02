import { Hono } from 'hono'
import { createFactory } from 'hono/factory'
import { userService } from '../services/user.service.js'
import { Optional } from '../utils/optional.js'

// 1. Define your Env (Crucial for Cloudflare later)
type Env = {
  Variables: {}
  Bindings: {}
}

// 2. Pass the Env to both the factory and the Hono instance
const factory = createFactory<Env>()
const userRoutes = new Hono<Env>()


userRoutes.get('/:id', ...factory.createHandlers(async (c) => {
  // 1. Wrap the param and throw 400 if missing
  const id = Optional.of(c.req.param('id'))
    .orElseThrow('ID is required', 400);
    
    console.log(`Searching for user with ID: ${id}`)

  // 2. Wrap the service result and throw 404 if user doesn't exist
  const user = await userService.getUserById(id);
  
  const safeUser = Optional.of(user)
    .orElseThrow('User not found', 404);

  return c.json(safeUser);
}))

export default userRoutes