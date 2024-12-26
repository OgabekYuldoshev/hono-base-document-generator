import { zValidator } from "@hono/zod-validator"
import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { cors } from 'hono/cors'
import { HTTPException } from "hono/http-exception"
import { logger } from 'hono/logger'
import { routes } from "./features/routes"
import uploadRoute from "./features/upload/route"


const app = new Hono().basePath("/api")

app.use(logger());
app.use(cors());

app.use(
  '/admin/*',
  basicAuth({
    username: 'hono',
    password: 'hono',
  })
)

// biome-ignore lint/complexity/noForEach: <explanation>
routes.forEach(route => {
  app.route("/", route)
})

// Hono error handler
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ error: err.message, status: err.status }, err.status);
  }

  return c.json({ error: "Internal Server Error" }, 500);
});

export default app