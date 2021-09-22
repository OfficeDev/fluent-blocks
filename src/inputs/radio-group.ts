import { z } from 'zod'
import { inputPropsWithInitialStringValue } from './input-properties'

export const radioItemProps = z.object({
  value: z.string().nonempty(),
  label: z.string().nonempty(), // TODO: change to `phrasingContentProps`
})

export const radioGroupProps = inputPropsWithInitialStringValue.merge(
  z.object({
    type: z.literal('radio-group'),
    options: z.array(radioItemProps).min(2),
  })
)
