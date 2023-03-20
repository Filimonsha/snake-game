import yandexApi from '../yandexBaseQuery'

const REDIRECT_URI = process.env.REDIRECT_URI
const OAUTH_URL = `https://ya-praktikum.tech/api/v2/oauth/yandex`

export const onOauth = async () => {
  const { service_id } = await fetch(`http://localhost:3001/api/v1/oauth/yandex/service-id?redirect_uri=${REDIRECT_URI}`)
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
