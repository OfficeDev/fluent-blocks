import { z } from 'zod'

export const pathProps = z.object({
  path: z.array(z.string()),
})

export type PathProps = z.infer<typeof pathProps>

export type PropsWithPath<P> = P & PathProps

export const propsWithPath = (zt: z.AnyZodObject) => zt.merge(pathProps)
