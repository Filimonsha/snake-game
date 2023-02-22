import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnect } from './db'
import { themeRouter } from './routes/themeRouter';
import { API_THEME_ROUTE } from './constants';

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json());
const port = Number(process.env.SERVER_PORT) || 3001

dbConnect()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.use(API_THEME_ROUTE, themeRouter)

app.listen(port, () => {
  console.log(`🎸 Server is listening on port: ${port}`)
})
