import type { ModelAttributes } from 'sequelize';
import { DataType, Model } from 'sequelize-typescript';

export interface ITheme {
  id: number,
  userId: number,
  theme: string,
}

export const themeModel: ModelAttributes<Model, ITheme> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    unique: true,
    type: DataType.INTEGER,
    allowNull: false,
  },
  theme: {
    type: DataType.STRING,
  }
}
