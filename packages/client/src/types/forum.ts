export type ForumComment = { 
  id: string, 
  idUser: string, 
  topicId: string, 
  text: string
}

export type ForumCommentResponse = Array<ForumComment>;

export type Topic = {
  id: string, 
  title: string
}

export type AddTopic = {
  idUser: string,
  text: string
}

export type TopicsFullInfo = Array<Topic>;

export type topicMutation = { 
  title: string, 
  creatorUserId: string 
}