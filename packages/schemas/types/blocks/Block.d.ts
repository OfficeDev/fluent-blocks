import { BigMessageProps } from './BigMessage'
import { ParagraphProps } from './Paragraph'
import { LayoutProps } from './Layout'
import { FigureProps } from './Figure'
import { CardProps } from './Card'
import { ShortInputsProps } from './ShortInputs'
import { MultilineTextInputProps, RadioGroupProps } from '../inputs'

export type BlockEntity = ParagraphProps | LayoutProps | FigureProps | CardProps | ShortInputsProps | MultilineTextInputProps | RadioGroupProps | BigMessageProps
