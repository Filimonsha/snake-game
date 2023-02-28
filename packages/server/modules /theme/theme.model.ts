import { AllowNull, Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

export type TThemeSite = {
  idUser?: string,
  theme: string,
}

@Table({ 
  timestamps: false 
})
export class ThemeSite extends Model<TThemeSite> {
  @PrimaryKey
  @AllowNull(false)
  @Column
  idUser!: string

  @AllowNull(false)
  @Column
  theme!: string
}
