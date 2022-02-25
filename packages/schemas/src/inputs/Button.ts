import { z } from 'zod'
import { actionPayload } from '../lib/actions'
import { iconSize, iconVariant } from '../inlines'

export const buttonActions = {
  activate: actionPayload.merge(z.object({ type: z.literal('activate') })),
}

export const buttonProps = z.object({
  type: z.literal('button'),
  label: z.string().min(1), // this is intentionally not `inlineSequence` and it must not be an empty string
  actionId: z.string(),
  variant: z
    .union([
      z.literal('outline'),
      z.literal('primary'),
      z.literal('subtle'),
      z.literal('transparent'),
    ])
    .optional(),
  size: z
    .union([z.literal('small'), z.literal('medium'), z.literal('large')])
    .optional(),
  iconOnly: z.boolean().optional(),
  icon: z.string().optional(),
  iconPosition: z.union([z.literal('before'), z.literal('after')]).optional(),
  iconSize: iconSize.optional(),
  iconVariant: iconVariant.optional(),
})
