import { graphConfig } from './AuthConfig'

export enum GraphApi {
  UserProfile = 'me',
  ListMyChats = 'me/chats',
  ListMessagsInChats = 'me/chats/{0}/',
  ListMessags = 'me/chats/{0}/messages',
}

export async function callMsGraph(
  accessToken: string,
  graphApi: GraphApi,
  ...param: string[]
) {
  const headers = new Headers()
  const bearer = `Bearer ${accessToken}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers,
  }
  const populatedGraphUrl = replaceString(graphApi, param)
  const graphUrl = graphConfig.graphHostUrl + populatedGraphUrl

  return fetch(graphUrl, options)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

const replaceString = (input: string, param: string[]) => {
  for (let i = 0; i < param.length; i++) {
    input = input.replace(`{${i}}`, param[i])
  }
  return input
}
