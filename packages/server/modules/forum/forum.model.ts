import { AllowNull, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from '../auth/auth.model'

export type TForumTopic = {
  id?: number
  title: string
  creatorUserId: number
}

export type TForumResponse = {
  id?: number
  text: string
  topicId: number
  idUser: number
}

@Table
export class ForumTopic extends Model<TForumTopic> {
  @AllowNull(false)
  @Column
  title!: string

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  creatorUserId!: number
}

@Table
export class ForumResponse extends Model<TForumResponse> {
  @AllowNull(false)
  @Column(DataType.TEXT)
  text!: string

  @AllowNull(false)
  @ForeignKey(() => ForumTopic)
  @Column
  topicId!: number

  @AllowNull(false)
  @Column
  idUser!: number
}
