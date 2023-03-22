import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import dotenv from 'dotenv'
import { LeaderBoard } from './modules/leaderBoard/leaderBoard.model'
import { ForumResponse, ForumTopic } from './modules/forum/forum.model'
import { ThemeSite } from './modules/theme/theme.model'
import { User } from './modules/auth/auth.model'

dotenv.config()

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST
} =
  process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [
    LeaderBoard,
    ForumTopic,
    ForumResponse,
    ThemeSite,
    User,
  ]
}

export const sequelize = new Sequelize(sequelizeOptions)

// Подключение к БД
export const dbConnect = async () => {
  try {
    // Проверка аутентификации в БД
    await sequelize.authenticate()
    // Синхронизация БД
    await sequelize.sync({ force: false })
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
