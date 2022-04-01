import { memo, Suspense, useState, useCallback, useEffect, useRef } from 'react'
import { ChatMessage as GraphChatMessage } from 'microsoft-graph'
import useSwr from 'swr'
import get from 'lodash/get'
import {
  ChatMessage,
  useCommonStyles,
  sx,
  BigMessage,
  ShortTextInput,
} from '@fluent-blocks/react'
import { GraphEntity, graphUri, useGraph } from '../lib/GraphProvider'
import { inlinesFromHtml } from '../lib/inlinesFromHtml'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import { ShortTextInputActionPayload } from '@fluent-blocks/schemas'

export interface ChatProps {
  chatId: string
}

const useChatStyles = makeStyles({
  root: {
    backgroundColor: 'var(--colorNeutralBackground3)',
    '--surface-background': 'var(--colorNeutralBackground1)',
    display: 'flex',
    flexDirection: 'column',
    ...sx.gap('.5rem'),
    paddingBlockStart: '2rem',
    maxHeight: 'calc(100vh - 8.8rem)',
  },
  messages: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column-reverse',
    overflowY: 'auto',
    ...sx.padding('1rem', 0),
  },
  compose: {
    ...sx.padding('1rem', 0),
  },
})

const ChatMessages = ({ chatId }: { chatId: string }) => {
  const { graphGet, activeAccountId } = useGraph()

  const fetcher = useCallback(
    (params: string) => graphGet(params).then(({ value }) => value),
    [graphGet]
  )

  const { data, error } = useSwr(
    graphUri(GraphEntity.ListMessages, chatId),
    fetcher,
    { suspense: true, refreshInterval: 1e3 }
  )

  const messageIds = (data || []).map(({ id }: GraphChatMessage) => id)

  const $messages = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if ($messages.current) {
      $messages.current.scrollTop = 9999
    }
  }, messageIds)

  const chatStyles = useChatStyles()

  return (
    <div ref={$messages} className={chatStyles.messages}>
      {(data || []).map((message: GraphChatMessage) => {
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

const Compose = ({ chatId }: { chatId: string }) => {
  const { graphPost } = useGraph()
  const [sending, setSending] = useState(false)
  const chatStyles = useChatStyles()
  return (
    <div className={chatStyles.compose}>
      <ShortTextInput
        {...{
          actionId: 'compose',
          label: 'Type a new message, then press ‘Enter’ to send',
          placeholderIsLabel: true,
          inputType: 'text',
          type: 'text',
          onAction: ({ value }: ShortTextInputActionPayload) => {
            if (!sending) {
              setSending(true)
              graphPost(graphUri(GraphEntity.ListMessages, chatId), {
                body: {
                  type: 'text',
                  content: value,
                },
              }).then(() => setSending(false))
              return ''
            } else {
              return value
            }
          },
        }}
      />
    </div>
  )
}

const UnmemoizedChat = ({ chatId }: ChatProps) => {
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
      <Suspense
        fallback={
          <BigMessage
            message={{
              variant: 'big',
              title: 'Loading messages…',
              viewportHeight: false,
            }}
          />
        }
      >
        <ChatMessages {...{ chatId }} />
      </Suspense>
      <Compose chatId={chatId} />
    </div>
  )
}

export const Chat = memo(UnmemoizedChat)
