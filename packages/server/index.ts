import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { dbConnect } from './db'
import { json, urlencoded } from 'body-parser'
import { leaderBoardRoutes } from './modules /leaderBoard/leaderBoard.routes'
import { forumRoutes } from './modules /forum/forum.routes'
import { themeRoutes } from './modules /theme/theme.routes'

dotenv.config()

const app = express()
const port = Number(process.env.SERVER_PORT) || 3001
const API_ROUTE = '/api/v1'

app.use(cors())

// parse requests of content-type - application/json
app.use(json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }))

// db connect
dbConnect()

// routes
app.use(`${API_ROUTE}/leaderboard`, leaderBoardRoutes)
app.use(`${API_ROUTE}/forum`, forumRoutes)
app.use(`${API_ROUTE}/theme`, themeRoutes)

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
