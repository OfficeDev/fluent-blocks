import { Chat as NaturalChat, ChatProps } from './Chat'
import { GraphProvider } from '../lib/GraphProvider'
import { FluentBlocksProvider } from '@fluent-blocks/react'
// @ts-ignore
import iconSprite from '@fluent-blocks/basic-icons/basic-icons.svg'

export const Chat = (_: ChatProps) => (
  <FluentBlocksProvider iconSpriteUrl={iconSprite}>
    <GraphProvider>
      <NaturalChat />
    </GraphProvider>
  </FluentBlocksProvider>
)
