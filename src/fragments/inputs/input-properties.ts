import { z } from 'zod'

export const inputProps = z.object({
  label: z.string().nonempty(), // TODO: change to `phrasingContentProps`
  required: z.boolean().optional(),
})

export const inputPropsWithInitialStringValue = inputProps.merge(
  z.object({
    initialValue: z.string().nonempty().optional().nullable(),
  })
)
