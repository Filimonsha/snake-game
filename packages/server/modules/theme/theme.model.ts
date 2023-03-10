import { AllowNull, Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

export type TThemeSite = {
  idUser?: number,
  theme: string,
}

@Table({
  timestamps: false
})
export class ThemeSite extends Model<TThemeSite> {
  @PrimaryKey
  @AllowNull(false)
  @Column
  idUser!: number

  @AllowNull(false)
  @Column
  theme!: string
}
