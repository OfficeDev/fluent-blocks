import { z } from 'zod'
import {
  inputPropsWithInitialStringValue,
  labeledValueProps,
} from './input-properties'

export const radioGroupProps = inputPropsWithInitialStringValue.merge(
  z.object({
    type: z.literal('radio-group'),
    options: z.array(labeledValueProps).min(2),
  })
)
