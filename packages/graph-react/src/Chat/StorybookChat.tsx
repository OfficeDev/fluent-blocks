import { Suspense, useCallback } from 'react'
import { View, BigMessage, Escape } from '@fluent-blocks/react'
import { Chat as NaturalChat, ChatProps } from './Chat'
import {
  GraphEntity,
  GraphProvider,
  graphUri,
  useGraph,
} from '../lib/GraphProvider'
import sbGpProps from '../lib/storybookGraphProviderProps'

// @ts-ignore
import iconSprite from '@fluent-blocks/basic-icons/basic-icons.svg'
import useSwr from 'swr'

const FirstChat = (_: {}) => {
  const { graphGet } = useGraph()
  const fetcher = useCallback(
    (params: string) => graphGet(params).then(({ value }) => value[0]),
    []
  )
  const { data, error } = useSwr(graphUri(GraphEntity.ListMyChats), fetcher, {
    suspense: true,
  })
  return data?.id ? <NaturalChat chatId={data.id} /> : null
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
              <FirstChat />
            </Suspense>
          </Escape>,
        ],
      }}
    />
  </GraphProvider>
)
