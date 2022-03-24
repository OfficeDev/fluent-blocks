import { ButtonProps } from '../inputs'
import { MediaEntity } from '../media'
import { InlineSequenceOrString } from '../inlines'
import { HeadingLevel } from './Heading'

export type ActionProps = Omit<ButtonProps, 'variant' | 'type'>

export interface ActionsBlockProps {
  primary?: ActionProps
  secondary?: ActionProps
  tertiary?: ActionProps
}

export interface BigMessageProps {
  message: {
    variant: 'big'
    title: InlineSequenceOrString
    media?: MediaEntity
    abstract?: InlineSequenceOrString
    actions?: ActionsBlockProps
    viewportHeight?: boolean
  }
  level?: HeadingLevel
}
