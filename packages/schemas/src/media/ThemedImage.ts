import { z, ZodTypeAny } from 'zod'
import { mediaProps } from './media-properties'

export const imageSrc = z.string().url()

export const themedImageProps = mediaProps.merge(
  z.object({
    light: imageSrc,
    dark: imageSrc,
    'high-contrast': imageSrc,
  })
)
