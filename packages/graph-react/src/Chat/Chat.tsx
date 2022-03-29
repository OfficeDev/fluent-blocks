import { Suspense, useMemo } from 'react'
import { ChatMessage as GraphChatMessage } from 'microsoft-graph'
import get from 'lodash/get'
import {
  ChatMessage,
  Paragraph,
  ShortInputs,
  useCommonStyles,
  sx,
} from '@fluent-blocks/react'
import { GraphEntity, useGraph } from '../lib/GraphProvider'
import { AsyncResource } from '../lib/Resource/AsyncResource'
import { inlinesFromHtml } from '../lib/inlinesFromHtml'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

export interface ChatProps {
  chatId: string
}

const useChatStyles = makeStyles({
  root: {
    backgroundColor: 'var(--colorNeutralBackground3)',
    '--surface-background': 'var(--colorNeutralBackground1)',
    ...sx.padding('16px'),
  },
  messages: {
    marginBlockEnd: '8px',
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
  const chatStyles = useChatStyles()
  const commonStyles = useCommonStyles()
  return (
    <div
      className={cx(
        chatStyles.root,
        commonStyles.mainContentWidth,
        commonStyles.centerBlock
      )}
    >
      <div className={chatStyles.messages}>
        {(messages || []).map((message) => {
          const fromId = message.from?.user?.id
          const fromActiveUser =
            activeAccountId && fromId && activeAccountId.includes(fromId)
          const messageType = get(message, ['body', 'contentType'], null)
          const messageBody = get(message, ['body', 'content'], '')
          const chatMessage =
            messageType === 'html'
              ? inlinesFromHtml(messageBody)
              : [messageBody]
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
      <ShortInputs
        inputs={[
          {
            actionId: 'compose',
            label: ' ',
            placeholder: 'Type a new message',
            inputType: 'text',
            type: 'text',
          },
          {
            actionId: 'send',
            type: 'action',
            label: 'Send',
            icon: 'send',
            iconOnly: true,
            variant: 'primary',
          },
        ]}
      />
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
    <Suspense fallback={<Paragraph paragraph="Loading messages…" />}>
      <ChatMessages {...{ messagesResource, activeAccountId }} />
    </Suspense>
  )
}
