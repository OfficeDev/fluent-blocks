import { z, ZodObject, ZodRawShape, ZodUnion, ZodEffects } from 'zod'
import { ReactElement } from 'react'

export function jsxon<Z extends ZodObject<ZodRawShape>, T>(
  props: Z
): ZodUnion<[Z, ZodEffects<ZodObject<{ props: Z }>, ReactElement<T>>]> {
  return z.union([
    props,
    z
      // check only the props
      .object({ props })
      // mark all other keys as known and ignorable
      .catchall(z.any())
      // cast result as ReactElement accepting provided props
      .transform((el) => el as ReactElement<T>),
  ])
}
