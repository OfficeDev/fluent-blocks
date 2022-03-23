import { z } from 'zod'

export const iconVariant = z.union([z.literal('filled'), z.literal('outline')])

export const iconSize = z.union([
  z.literal(10),
  z.literal(12),
  z.literal(16),
  z.literal(20),
  z.literal(24),
  z.literal(28),
  z.literal(32),
  z.literal(48),
  z.literal('10'),
  z.literal('12'),
  z.literal('16'),
  z.literal('20'),
  z.literal('24'),
  z.literal('28'),
  z.literal('32'),
  z.literal('48'),
])

export const iconProps = z.object({
  icon: z.string(),
  variant: iconVariant.default('outline').optional(),
  size: iconSize.default(16).optional(),
})
export type ZIconProps = typeof iconProps
