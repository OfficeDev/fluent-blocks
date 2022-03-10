import { z } from 'zod'
import { buttonProps } from '../inputs'

export const toolbarAction = buttonProps
  .omit({
    variant: true,
    size: true,
    iconSize: true,
  })
  .merge(
    z.object({
      type: z.literal('action'),
    })
  )

export const toolbarDivider = z.object({
  type: z.literal('divider'),
  variant: z
    .union([z.literal('line'), z.literal('flex-space')])
    .default('line')
    .optional(),
})

export const toolbarItemEntity = z.union([toolbarAction, toolbarDivider])

export const toolbarItemSequence = z.array(toolbarItemEntity)

export const toolbarProps = z.object({
  toolbar: z.object({
    items: toolbarItemSequence,
  }),
})
