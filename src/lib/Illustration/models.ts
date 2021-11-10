import { z } from 'zod'
import { Theme, theme } from '../theme'

export const url = z.string()

export type URL = z.infer<typeof url>

export const illustrationName = z.union([
  z.literal('default'),
  z.literal('empty'),
  z.literal('error'),
  z.literal('hello'),
  z.literal('thanks'),
])

export type IllustrationName = z.infer<typeof illustrationName>

export const namedIllustrationProps = z.object({
  name: illustrationName,
})

export type NamedIllustrationProps = z.infer<typeof namedIllustrationProps>

export function isNamedIllustrationProps(o: any): o is NamedIllustrationProps {
  return !!o && typeof o == 'object' && 'name' in o
}

export function isIllustrationName(o: any): o is IllustrationName {
  return illustrationName.safeParse(o)?.success
}

export const urlOrJsx = z.union([url, z.any()]) // TODO avoid any

export type UrlOrJsx = z.infer<typeof urlOrJsx>

const themedImageShape: { [key in Theme]: UrlOrJsx } = {} as any

theme.options.forEach((o) => (themedImageShape[o.value] = urlOrJsx))

export const themedImageProps = z.object(themedImageShape)

export type ThemedImageProps = z.infer<typeof themedImageProps>

export function isThemedImageProps(o: any): o is ThemedImageProps {
  return theme.options.reduce<boolean>(
    (all, next) => all && !!(!!o && typeof o == 'object' && next.value in o),
    true
  )
}

export const imageProps = z.union([namedIllustrationProps, themedImageProps])

export type ImageProps = z.infer<typeof imageProps>

export function isImageProps(o: any): o is ImageProps {
  return isNamedIllustrationProps(o) || isThemedImageProps(o)
}
