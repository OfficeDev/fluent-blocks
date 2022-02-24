import { z, ZodRawShape } from 'zod'

export const object =
  (naturalShape: ZodRawShape) => (shapeExtension?: ZodRawShape) =>
    z.object({
      ...naturalShape,
      ...shapeExtension,
    })
