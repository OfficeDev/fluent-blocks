import { MultilineTextInputProps, RadioGroupProps } from '../inputs'
import { BigMessageProps } from './BigMessage'
import { CardProps } from './Card'
import { FigureProps } from './Figure'
import { LayoutProps } from './Layout'
import { ParagraphProps } from './Paragraph'
import { ShortInputsProps } from './ShortInputs'

export type BlockEntity =
  | ParagraphProps
  | LayoutProps
  | FigureProps
  | CardProps
  | ShortInputsProps
  | MultilineTextInputProps
  | RadioGroupProps
  | BigMessageProps

export type BlockSequence = BlockEntity[]
