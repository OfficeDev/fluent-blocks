import { z } from 'zod'
import { Centered } from '../Centered/Centered'
import { Illustration } from '../Illustration'
import {
  themedImageProps,
  illustrationName,
  isIllustrationName,
  isThemedImageProps,
} from '../Illustration/models'

export const communicationProps = z.object({
  illustration: z.union([illustrationName, themedImageProps]).optional(),
  title: z.string(),
  description: z.string().optional(),
  actions: z.string().optional(),
  fullHeight: z.boolean().optional(),
})

export type CommunicationProps = z.infer<typeof communicationProps>

export function Communication(props: CommunicationProps) {
  const { illustration, title, description, actions, fullHeight } = {
    fullHeight: true,
    ...props,
  }
  return (
    <Centered fullHeight={fullHeight}>
      {!!illustration ? (
        isIllustrationName(illustration) ? (
          <Illustration name={illustration} />
        ) : isThemedImageProps(illustration) ? (
          <Illustration {...illustration} />
        ) : (
          <Illustration name="error" />
        )
      ) : null}
    </Centered>
  )
}
