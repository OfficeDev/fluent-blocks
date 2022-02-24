import { ReactElement } from 'react'
import { z, ZodObject, ZodRawShape, ZodUnion, ZodEffects } from 'zod'

type FCElementConstructor<P> = (props: P) => ReactElement<P> | null

export function zodElement<
  Z extends ZodObject<ZodRawShape>,
  T extends FCElementConstructor<z.infer<Z>>
>(props: Z): ZodEffects<ZodObject<{ props: Z }>, ReactElement<z.infer<Z>, T>> {
  return (
    z
      // check only the props
      .object({ props })
      // mark all other keys as known and ignorable
      .catchall(z.any())
      // cast result as ReactElement accepting provided props `P` and constructor `T`
      .transform((el) => el as ReactElement<z.infer<Z>, T>)
  )
}

export function propsElementUnion<
  Z extends ZodObject<ZodRawShape>,
  T extends FCElementConstructor<z.infer<Z>>
>(
  props: Z
): ZodUnion<
  [Z, ZodEffects<ZodObject<{ props: Z }>, ReactElement<z.infer<Z>, T>>]
> {
  return z.union([props, zodElement<Z, T>(props)])
}
