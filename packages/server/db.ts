import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { themeModel } from './models/themeModel';

const { 
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT 
} =
  process.env;
  
const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);

// Инициализируем модели
export const Theme = sequelize.define('Theme', themeModel, { timestamps: false });

// Подключение к БД
export const dbConnect = async () => {
  try {
      // Проверка аутентификации в БД
      await sequelize.authenticate();
      // Синхронизация БД
      await sequelize.sync();
      console.log('Connection has been established successfully.');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
}
