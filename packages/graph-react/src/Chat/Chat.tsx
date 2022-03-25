import { Suspense } from 'react'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../lib/authConfig'
import { callMsGraph, GraphApi } from '../lib/graph'
import { AsyncResource } from '../lib/Resource/AsyncResource'

export interface ChatProps {}

const ChatMessages = ({
  chatResource,
}: {
  chatResource: AsyncResource<{}>
}) => {
  const messages = chatResource.read()
  return <pre>{JSON.stringify(messages, null, 4)}</pre>
}

export const Chat = (_: ChatProps) => {
  const { instance, accounts } = useMsal()
  const chatResource = new AsyncResource(
    instance
      .acquireTokenSilent({ ...loginRequest, account: accounts[0] })
      .then(({ accessToken }) =>
        callMsGraph(accessToken, GraphApi.ListMyChats).then((chats) => [
          accessToken,
          chats,
        ])
      )
      .then(([accessToken, chats]) =>
        callMsGraph(accessToken, GraphApi.ListMessages, chats.value[0].id)
      )
  )

  return (
    <Suspense fallback={'Loading…'}>
      <ChatMessages {...{ chatResource }} />
    </Suspense>
  )
}
