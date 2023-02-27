import { AllowNull, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'

export type TForumTopic = {
  id?: number
  title: string
  creatorUserId: string
}

export type TForumResponse = {
  id?: number
  text: string
  topicId: number
  idUser: string
}

@Table
export class ForumTopic extends Model<TForumTopic> {
  @AllowNull(false)
  @Column
  title!: string

  @AllowNull(false)
  @Column
  creatorUserId!: string
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
  idUser!: string
}
