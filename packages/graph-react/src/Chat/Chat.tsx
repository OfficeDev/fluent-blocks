import { Suspense, useMemo } from 'react'
import { ChatMessage as GraphChatMessage } from 'microsoft-graph'
import get from 'lodash/get'
import { ChatMessage, sx } from '@fluent-blocks/react'
import { GraphEntity, useGraph } from '../lib/GraphProvider'
import { AsyncResource } from '../lib/Resource/AsyncResource'
import { inlinesFromHtml } from '../lib/inlinesFromHtml'
import { makeStyles } from '@fluentui/react-components'

export interface ChatProps {
  chatId: string
}

const useMessagesStyles = makeStyles({
  root: {
    backgroundColor: 'var(--colorNeutralBackground3)',
    '--surface-background': 'var(--colorNeutralBackground1)',
    ...sx.padding('16px'),
  },
})

const ChatMessages = ({
  messagesResource,
  activeAccountId,
}: {
  messagesResource: AsyncResource<GraphChatMessage[]>
  activeAccountId: string[] | null
}) => {
  const messages = messagesResource.read()
  const messagesStyles = useMessagesStyles()
  return (
    <div className={messagesStyles.root}>
      {(messages || []).map((message) => {
        const fromId = message.from?.user?.id
        const fromActiveUser =
          activeAccountId && fromId && activeAccountId.includes(fromId)
        const messageType = get(message, ['body', 'contentType'], null)
        const messageBody = get(message, ['body', 'content'], '')
        const chatMessage =
          messageType === 'html' ? inlinesFromHtml(messageBody) : [messageBody]
        return (
          <ChatMessage
            key={message.id}
            {...{
              instant: message.createdDateTime || '',
              author: {
                name: message.from?.user?.displayName ?? 'System',
                isSelf: !!fromActiveUser,
              },
              chatMessage,
            }}
          />
        )
      })}
    </div>
  )
}

export const Chat = ({ chatId }: ChatProps) => {
  const { graphGet, activeAccountId } = useGraph()

  const messagesResource = useMemo(
    () =>
      new AsyncResource(
        graphGet(GraphEntity.ListMessages, chatId).then(({ value }) => value)
      ),
    [chatId]
  )

  return (
    <Suspense fallback={'Loading messages…'}>
      <ChatMessages {...{ messagesResource, activeAccountId }} />
    </Suspense>
  )
}
