import { z } from 'zod'
import { mediaPropsShape } from './media-properties'

export const illustrationProps = z.object({
  ...mediaPropsShape,
  illustration: z.union([
    z.literal('default'),
    z.literal('empty'),
    z.literal('error'),
    z.literal('hello'),
    z.literal('thanks'),
  ]),
})
