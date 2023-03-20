import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import express from 'express'
import { dbConnect } from './db'
import { json, urlencoded } from 'body-parser'
import { leaderBoardRoutes } from './modules/leaderBoard/leaderBoard.routes'
import { forumRoutes } from './modules/forum/forum.routes'
import { themeRoutes } from './modules/theme/theme.routes'
import { authRoutes } from './modules/auth/auth.routes'
import { userRoutes } from './modules/user/user.routes'
import { oauthRoutes } from './modules/oauth/oauth.routes'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'
import { promises as fs } from 'fs'
import * as path from 'path'
import { cspMiddleware } from './middlewares/cspMiddleware'

dotenv.config()

const isDev = () => process.env.NODE_ENV === 'development'
const app = express()

async function startServer() {
  const swaggerDocument = YAML.load('./swagger.yaml')
  const port = Number(process.env.SERVER_PORT) || 3001
  const API_ROUTE = '/api/v1'

  // content security policy
  app.use(cspMiddleware())
  
  // parse cookies
  app.use(cookieParser())

  // parse requests of content-type - application/json
  app.use(json())

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(urlencoded({ extended: true }))

  // db connect
  dbConnect()

  let vite: ViteDevServer | undefined

  const resolve = (p: string) => path.resolve(__dirname, process.env.PATH_STATIC + p);

  const distPath = resolve('/dist')
  const ssrClientPath = resolve('/dist-ssr/ssr.cjs')
  const srcPath = resolve('/')

  const getStyleSheets = async () => {
    try {
      const assetPath = path.join(distPath, 'assets')
      const files = await fs.readdir(assetPath)
      const cssAssets = files.filter(l => l.endsWith('.css'))
      const allContent = []
      for (const asset of cssAssets) {
        const content = await fs.readFile(path.join(assetPath, asset), 'utf-8')
        allContent.push(`<style type='text/css'>${content}</style>`)
      }
      return allContent.join('\n')
    } catch {
      return ''
    }
  }

  if (isDev()) {
    vite = await createViteServer({
      server: { 
        middlewareMode: true,
        cors: {
          credentials: true, 
          origin: 'http://localhost:3000'
        }},
      root: srcPath,
      appType: 'custom'
    })

    app.use(vite.middlewares)
  }

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
    app.use('/snakeGame', express.static(path.resolve(distPath, 'snakeGame')))

    app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true }))
  }

  const styleSheets = getStyleSheets()

  // swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  // avatars
  app.use('/resources', express.static('resources'))

  // routes
  app.use(`${API_ROUTE}/leaderboard`, leaderBoardRoutes)
  app.use(`${API_ROUTE}/forum`, forumRoutes)
  app.use(`${API_ROUTE}/theme`, themeRoutes)
  app.use(`${API_ROUTE}/auth`, authRoutes)
  app.use(`${API_ROUTE}/user`, userRoutes)
app.use(`${API_ROUTE}/oauth`, oauthRoutes)

  app.use('*', async (req: any, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      let render: (url: string) => Promise<string>

      if (isDev() && vite) {
        template = await fs.readFile(
          path.resolve(srcPath, 'index.html'),
          'utf-8'
        )
        template = await vite.transformIndexHtml(url, template)

        render = (await vite.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render
      } else {
        template = await fs.readFile(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )

        render = (await import(ssrClientPath)).render
      }

      const cssAssets = isDev() ? await styleSheets : ''
      const appHtml = await render(url)

      const html = template
        .replace(`<!--ssr-styles-->`, cssAssets)
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(/<script/g, `<script nonce='${req.nonce}'`)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev() && vite) {
        vite.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
