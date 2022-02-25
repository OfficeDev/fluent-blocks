import { z, ZodTypeAny } from 'zod'
import { mediaPropsShape } from './media-properties'

export const imageSrc = z.string().url()

export const themedImageProps = z.object({
  ...mediaPropsShape,
  light: imageSrc,
  dark: imageSrc,
  'high-contrast': imageSrc,
})
