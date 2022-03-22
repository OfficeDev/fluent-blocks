import { z } from 'zod'

export const themeName = z.union([
  z.literal('light'),
  z.literal('dark'),
  z.literal('highContrast'),
])

export const accentScheme = z.union([z.literal('web'), z.literal('teams')])
