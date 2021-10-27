import { z } from 'zod'
import {
  imageProps,
  isNamedIllustration,
  isThemedImage,
  isUrlImage,
} from './models'

import { NamedIllustration } from './NamedIllustration'
import { ThemedImage } from './ThemedImage'
import { UrlImage } from './UrlImage'

export const illustrationProps = z.object({
  illustration: imageProps.optional(),
})

export type IllustrationProps = z.infer<typeof illustrationProps>

export function Illustration(props: IllustrationProps) {
  const { illustration } = props
  const error = <NamedIllustration name="error" />
  return illustration ? (
    isUrlImage(illustration) ? (
      <UrlImage {...illustration} />
    ) : isNamedIllustration(illustration) ? (
      <NamedIllustration {...illustration} />
    ) : isThemedImage(illustration) ? (
      <ThemedImage {...illustration} />
    ) : (
      error
    )
  ) : (
    error
  )
}
