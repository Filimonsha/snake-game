import { AllowNull, Column, Model, Table } from 'sequelize-typescript'

export type TThemeSite = {
  idUser?: string,
  theme: string,
}

@Table
export class ThemeSite extends Model<TThemeSite> {
  @AllowNull(false)
  @Column
  idUser!: string

  @AllowNull(false)
  @Column
  theme!: string
}
