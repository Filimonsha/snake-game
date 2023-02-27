import { AllowNull, Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

export type TLeaderBoard = {
  idUser: string
  point: number
}

@Table
export class LeaderBoard extends Model<TLeaderBoard> {
  @PrimaryKey
  @Column
  idUser!: string

  @AllowNull(false)
  @Column
  point!: number
}
