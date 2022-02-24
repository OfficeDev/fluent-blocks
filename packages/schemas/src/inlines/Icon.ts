import { z } from 'zod'
import * as ex from '../lib/extensible-types'

export const iconVariant = ex.union([z.literal('filled'), z.literal('outline')])

export const iconSize = ex.union([
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

export const iconProps = ex.object({
  icon: z.string(),
  variant: iconVariant().default('outline').optional(),
  size: iconSize().default(20).optional(),
})
