import { z } from 'zod'

export const themeName = z.union([
  z.literal('light'),
  z.literal('dark'),
  z.literal('high-contrast'),
])

export const accentScheme = z.union([z.literal('web'), z.literal('teams')])
