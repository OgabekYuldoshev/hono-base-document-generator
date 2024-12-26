
import { serve } from '@hono/node-server'
import app from './app'
import { log } from './lib/logger'

serve({ fetch: app.fetch, port: Number(process.env.PORT) || 5500 }, (appInfo) => {
    log.info(`Server is running on http://localhost:${appInfo.port}`)
})

