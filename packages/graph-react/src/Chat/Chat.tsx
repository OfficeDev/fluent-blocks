import { Suspense, useMemo } from 'react'
import { ChatMessage as GraphChatMessage } from 'microsoft-graph'
import { ChatMessage } from '@fluent-blocks/react'
import { GraphEntity, useGraph } from '../lib/GraphProvider'
import { AsyncResource } from '../lib/Resource/AsyncResource'

export interface ChatProps {}

const ChatMessages = ({
  chatResource,
}: {
  chatResource: AsyncResource<GraphChatMessage[]>
}) => {
  const messages = chatResource.read()
  if (messages) {
    return (
      <>
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            {...{
              instant: message.createdDateTime || '',
              author: {
                name: message.from?.user?.displayName ?? 'Unknown',
              },
              chatMessage: message.body?.content || '<empty>',
            }}
          />
        ))}
      </>
    )
  } else {
    return null
  }
}

export const Chat = (_: ChatProps) => {
  const { graphGet } = useGraph()

  const chatResource = useMemo(
    () =>
      new AsyncResource(
        graphGet(GraphEntity.ListMyChats)
          .then(({ value }) => graphGet(GraphEntity.ListMessages, value[0].id))
          .then(({ value }) => value)
      ),
    []
  )

  return (
    <Suspense fallback={'Loading…'}>
      <ChatMessages {...{ chatResource }} />
    </Suspense>
  )
}
