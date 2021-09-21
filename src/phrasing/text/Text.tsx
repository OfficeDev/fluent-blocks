import { z } from 'zod'

export const textVariant = z.union([z.literal('normal'), z.literal('emphasized'), z.literal('strong'), z.literal('highlighted')])

export const textProps = z.object({
  text: z.string(),
  variant: textVariant,
})

export type TextProps = z.infer<typeof textProps>

export const Text = ({ text, variant }: TextProps) => {
  switch (variant) {
    // todo: handle other cases by wrapping in a `span` that applies the correct styles.
    default:
      return <>{text}</>
  }
}
