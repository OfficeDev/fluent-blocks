import { z } from 'zod'
import { inputPropsWithInitialStringValue } from './input-properties'
import { inlineSequence } from '../inlines'

export const radioItemProps = z.object({
  value: z.string().nonempty(),
  label: inlineSequence,
})

export const radioGroupProps = inputPropsWithInitialStringValue.merge(
  z.object({
    type: z.literal('radio-group'),
    options: z.array(radioItemProps).min(2),
  })
)
