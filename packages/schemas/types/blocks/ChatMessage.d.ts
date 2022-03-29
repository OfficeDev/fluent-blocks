import { Avatar } from '../media/Avatar'
import { InlineSequenceOrString } from '../inlines'

export interface ChatMessageProps {
  instant: string
  author: {
    name: string
    avatar?: Avatar['avatar']
    isSelf?: boolean
  }
  chatMessage: InlineSequenceOrString
}
