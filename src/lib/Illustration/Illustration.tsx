import { z } from 'zod'
import {
  imageProps,
  isNamedIllustrationProps,
  isThemedImageProps,
} from './models'

import { NamedIllustration } from './NamedIllustration'
import { ThemedImage } from './ThemedImage'

export const illustrationProps = imageProps

export type IllustrationProps = z.infer<typeof illustrationProps>

export function Illustration(props: IllustrationProps) {
  const error = <NamedIllustration name="error" />
  if (!props) {
    return error
  }
  return isNamedIllustrationProps(props) ? (
    <NamedIllustration {...props} />
  ) : isThemedImageProps(props) ? (
    <ThemedImage {...props} />
  ) : (
    error
  )
}
