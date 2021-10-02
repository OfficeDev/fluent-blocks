import { ReactElement } from 'react'
import { z, ZodObject, ZodRawShape, ZodUnion, ZodEffects } from 'zod'

type FCElementConstructor<P> = (props: P) => ReactElement<P> | null

export function zodElement<
  Z extends ZodObject<ZodRawShape>,
  P,
  T extends FCElementConstructor<P>
>(props: Z): ZodEffects<ZodObject<{ props: Z }>, ReactElement<P, T>> {
  return (
    z
      // check only the props
      .object({ props })
      // mark all other keys as known and ignorable
      .catchall(z.any())
      // cast result as ReactElement accepting provided props `P` and constructor `T`
      .transform((el) => el as ReactElement<P, T>)
  )
}

export function propsElementUnion<
  Z extends ZodObject<ZodRawShape>,
  P,
  T extends FCElementConstructor<P>
>(
  props: Z
): ZodUnion<[Z, ZodEffects<ZodObject<{ props: Z }>, ReactElement<P, T>>]> {
  return z.union([props, zodElement<Z, P, T>(props)])
}
