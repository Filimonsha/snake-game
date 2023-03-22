import yandexApi from '../yandexBaseQuery'
import { ForumCommentResponse, TopicsFullInfo, topicMutation, AddTopic } from '../../../../types/forum'

const getForumEndpoint = (endpoint: string) => `forum/${endpoint}`

export const forumApi = yandexApi.injectEndpoints({
  endpoints: builder => ({

    getComment: builder.query<ForumCommentResponse, string>({
      query: arg => ({
        url: getForumEndpoint(`${arg}/responses`)
      })
    }),

    addComment: builder.mutation<void, {topicId: string, body: AddTopic}>({
      query: arg => ({
        url: getForumEndpoint(`${arg.topicId}/responses`),
        method: 'POST',
        body: arg.body
      })
    }),

    getTopics: builder.query<TopicsFullInfo, void>({
      query: () => getForumEndpoint("")
    }),

    addTopics: builder.mutation<void, topicMutation>({
      query: arg => ({
        url: getForumEndpoint(""),
        method: 'POST',
        body: arg
      })
    })

  })
})

export const {
  useLazyGetCommentQuery,
  useAddCommentMutation,
  useAddTopicsMutation,
  useLazyGetTopicsQuery,
  useGetTopicsQuery
} = forumApi
