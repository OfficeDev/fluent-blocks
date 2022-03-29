import { useMemo, Suspense } from 'react'
import { Chat as GraphChat } from 'microsoft-graph'
import { View, BigMessage, Escape } from '@fluent-blocks/react'
import { Chat as NaturalChat, ChatProps } from './Chat'
import { GraphEntity, GraphProvider, useGraph } from '../lib/GraphProvider'
import sbGpProps from '../lib/storybookGraphProviderProps'
import { AsyncResource } from '../lib/Resource/AsyncResource'

// @ts-ignore
import iconSprite from '@fluent-blocks/basic-icons/basic-icons.svg'

const FirstChat = ({
  firstChatResource,
}: {
  firstChatResource: AsyncResource<GraphChat>
}) => {
  const chat = firstChatResource.read()
  return chat?.id ? <NaturalChat chatId={chat.id} /> : null
}

const FirstChatSuspense = () => {
  const { graphGet } = useGraph()

  const firstChatResource = useMemo(
    () =>
      new AsyncResource<GraphChat>(
        graphGet(GraphEntity.ListMyChats).then(({ value }) => value[0])
      ),
    []
  )
  return (
    <Suspense
      fallback={
        <BigMessage
          message={{
            variant: 'big',
            title: 'Loading chats…',
            viewportHeight: false,
          }}
        />
      }
    >
      <FirstChat {...{ firstChatResource }} />
    </Suspense>
  )
}

export const Chat = (_: ChatProps) => (
  <GraphProvider {...sbGpProps}>
    <View
      iconSpriteUrl={iconSprite}
      accentScheme="teams"
      main={{
        title: 'Chat',
        titleVisuallyHidden: true,
        blocks: [
          <Escape key="e1" contentMeetsAccessibilityAndDesignStandards>
            <FirstChatSuspense />
          </Escape>,
        ],
      }}
    />
  </GraphProvider>
)
