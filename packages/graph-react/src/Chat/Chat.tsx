import { memo, Suspense } from 'react'
import { ChatMessage as GraphChatMessage } from 'microsoft-graph'
import useSwr from 'swr'
import get from 'lodash/get'
import {
  ChatMessage,
  ShortInputs,
  useCommonStyles,
  sx,
  BigMessage,
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
    ...sx.padding('16px'),
  },
  messages: {
    marginBlockEnd: '8px',
  },
})

const ChatMessages = ({ chatId }: { chatId: string }) => {
  const { graphGet, activeAccountId } = useGraph()

  const fetcher = (params: string) =>
    graphGet(params).then(({ value }) => value)
  const { data, error } = useSwr(
    graphUri(GraphEntity.ListMessages, chatId),
    fetcher,
    { suspense: true, refreshInterval: 1e3 }
  )

  return (
    <>
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
    </>
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
      <div className={chatStyles.messages}>
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
      </div>
      <ShortInputs
        inputs={[
          {
            actionId: 'compose',
            label: 'Type a new message, then press ‘Enter’ to send',
            placeholderIsLabel: true,
            inputType: 'text',
            type: 'text',
            onAction: ({ value }: ShortTextInputActionPayload) => {
              console.log('[Send]', value)
            },
          },
          // {
          //   actionId: 'send',
          //   type: 'action',
          //   label: 'Send',
          //   icon: 'send',
          //   iconOnly: true,
          //   variant: 'primary',
          // },
        ]}
      />
    </div>
  )
}

export const Chat = memo(UnmemoizedChat)
