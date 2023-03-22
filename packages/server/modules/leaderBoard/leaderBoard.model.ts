import { AllowNull, Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

export type TLeaderBoard = {
  idUser: number
  score: number
}

@Table
export class LeaderBoard extends Model<TLeaderBoard> {
  @PrimaryKey
  @Column
  idUser!: number

  @AllowNull(false)
  @Column
  score!: number
}
