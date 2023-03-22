import yandexApi from '../yandexBaseQuery'
import { REDIRECT_URI } from '../../../../const/host'
import { SERVER_API } from '../../../../const/route'

const OAUTH_URL = `${SERVER_API}oauth/yandex`

export const onOauth = async () => {
  const { service_id } = await fetch(`${SERVER_API}oauth/yandex/service-id?redirect_uri=${REDIRECT_URI}`)
    .then(response => response.json())
    .then(data => data)
    .catch((error) => console.error(error));

  window.location.replace(
    `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${REDIRECT_URI}`
  )
}

export const oauthApi = yandexApi.injectEndpoints({
  endpoints: builder => ({
    Oauth: builder.mutation<string, string>({
      query: arg => ({
        url: OAUTH_URL,
        method: 'POST',
        body: {
          code: arg,
          redirect_uri: REDIRECT_URI
        },
      })
    }),
  })
})

export const {
  useOauthMutation
} = oauthApi
