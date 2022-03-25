import { Suspense, useMemo } from 'react'
import { ChatMessage as GraphChatMessage } from 'microsoft-graph'
import { ChatMessage } from '@fluent-blocks/react'
import { GraphEntity, useGraph } from '../lib/GraphProvider'
import { AsyncResource } from '../lib/Resource/AsyncResource'

export interface ChatProps {
  chatId: string
}

const ChatMessages = ({
  messagesResource,
}: {
  messagesResource: AsyncResource<GraphChatMessage[]>
}) => {
  const messages = messagesResource.read()
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

export const Chat = ({ chatId }: ChatProps) => {
  const { graphGet } = useGraph()

  const messagesResource = useMemo(
    () =>
      new AsyncResource(
        graphGet(GraphEntity.ListMessages, chatId).then(({ value }) => value)
      ),
    []
  )

  return (
    <Suspense fallback={'Loading messages…'}>
      <ChatMessages {...{ messagesResource }} />
    </Suspense>
  )
}
