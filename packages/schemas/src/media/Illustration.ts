import { z } from 'zod'
import { mediaProps } from './media-properties'

export const illustrationProps = mediaProps.merge(
  z.object({
    illustration: z.union([
      z.literal('default'),
      z.literal('empty'),
      z.literal('error'),
      z.literal('hello'),
      z.literal('thanks'),
    ]),
  })
)
