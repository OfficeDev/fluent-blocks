import { z, ZodObject, ZodRawShape } from 'zod'

export const jsxon = (props: ZodObject<ZodRawShape>) =>
  z.union([
    props,
    z
      .object({
        props,
      })
      .catchall(z.any()),
  ])
