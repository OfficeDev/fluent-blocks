import { z } from 'zod'
import { bigMessageProps } from './BigMessage'
import { paragraphProps } from './Paragraph'
import { layoutProps } from './Layout'
import { figureProps } from './Figure'
import { cardProps } from './Card'
import { shortInputsProps } from './ShortInputs'
import { multilineTextInputProps, radioGroupProps } from '../inputs'

export const blockEntity = z.union([
  paragraphProps,
  layoutProps,
  figureProps,
  cardProps,
  shortInputsProps,
  multilineTextInputProps,
  radioGroupProps,
  bigMessageProps,
])
