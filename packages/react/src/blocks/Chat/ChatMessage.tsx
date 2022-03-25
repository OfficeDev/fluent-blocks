import { ChatMessageProps as NaturalChatMessageProps } from '@fluent-blocks/schemas'
import { Avatar, AvatarProps } from '../../media'
import { InlineSequenceOrString, Text } from '../../inlines'
import { makeStyles } from '@fluentui/react-components'
import { useFluentBlocksContext } from '../../lib'
import { Paragraph } from '../Paragraph/Paragraph'

export interface ChatMessageProps
  extends Omit<NaturalChatMessageProps, 'author' | 'chatMessage'> {
  author: Omit<NaturalChatMessageProps['author'], 'avatar'> & {
    avatar?: AvatarProps['avatar']
  }
  chatMessage: InlineSequenceOrString
}

const useChatMessageStyles = makeStyles({
  root: {
    display: 'flex',
  },
})

export const ChatMessage = ({
  author,
  chatMessage,
  instant,
}: ChatMessageProps) => {
  const chatMessageStyles = useChatMessageStyles()
  const {
    translations: { locale },
  } = useFluentBlocksContext()
  return (
    <div className={chatMessageStyles.root} role="group">
      <Avatar avatar={author.avatar || {}} label={author.name} />
      <div>
        <div>
          <Text text={Intl.DateTimeFormat(locale).format(new Date(instant))} />
        </div>
        <Paragraph paragraph={chatMessage} />
      </div>
    </div>
  )
}
