import { ChatMessageProps as NaturalChatMessageProps } from '@fluent-blocks/schemas'
import { Avatar, AvatarProps } from '../../media'
import { InlineSequenceOrString, Text } from '../../inlines'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import { useFluentBlocksContext, sx } from '../../lib'
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
    ...sx.gap('8px'),
    marginBlockEnd: '4px',
  },
  'root--isSelf': {
    justifyContent: 'flex-end',
  },
  meta: {
    marginBlockEnd: '8px',
  },
  message: {
    ...sx.padding('8px', '16px'),
    position: 'relative',
    // @ts-ignore
    '& > :not([role="none"])': {
      position: 'relative',
      zIndex: 1,
    },
  },
  background: {
    position: 'absolute',
    ...sx.inset('0'),
    ...sx.borderRadius('var(--borderRadiusMedium)'),
    backgroundColor: 'var(--surface-background)',
  },
  'background--isSelf': {
    opacity: '0.1',
    backgroundColor: 'var(--colorBrandBackground)',
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
    <div
      className={cx(
        chatMessageStyles.root,
        author.isSelf && chatMessageStyles['root--isSelf']
      )}
      role="group"
    >
      {!author.isSelf && (
        <Avatar avatar={author.avatar || {}} label={author.name} />
      )}
      <div className={chatMessageStyles.message}>
        <div
          role="none"
          className={cx(
            chatMessageStyles.background,
            author.isSelf && chatMessageStyles['background--isSelf']
          )}
        />
        <div className={chatMessageStyles.meta}>
          <Text
            variant="caption"
            text={Intl.DateTimeFormat(locale).format(new Date(instant))}
          />
        </div>
        <Paragraph paragraph={chatMessage} />
      </div>
    </div>
  )
}
