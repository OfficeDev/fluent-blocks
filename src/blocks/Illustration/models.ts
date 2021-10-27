import { z } from 'zod'
import { Theme, theme } from '../../lib/theme'

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

export function isNamedIllustration(o: any): o is NamedIllustrationProps {
  return 'name' in o
}

export const urlOrJsx = z.union([url, z.any()]) // TODO avoid any

export type UrlOrJsx = z.infer<typeof urlOrJsx>

const themedImageShape: { [key in Theme]: UrlOrJsx } = {} as any

theme.options.forEach((o) => (themedImageShape[o.value] = urlOrJsx))

export const themedImageProps = z.object(themedImageShape)

export type ThemedImageProps = z.infer<typeof themedImageProps>

export function isThemedImage(o: any): o is ThemedImageProps {
  return theme.options.reduce<boolean>(
    (all, next) => all && !!(next.value in o),
    true
  )
}

export const urlImageProps = z.object({
  url: urlOrJsx,
})

export type UrlImageProps = z.infer<typeof urlImageProps>

export function isUrlImage(o: any): o is UrlImageProps {
  return 'url' in o
}

export const imageProps = z.union([
  namedIllustrationProps,
  themedImageProps,
  urlImageProps,
])

export type ImageProps = z.infer<typeof imageProps>

export function isImageProps(o: any): o is ImageProps {
  return isUrlImage(o) || isNamedIllustration(o) || isThemedImage(o)
}
