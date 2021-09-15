import { Text as TextProps } from '../../../types/view'

export const Text = ({ text, variant }: TextProps) => {
  switch (variant) {
    // todo: handle other cases by wrapping in a `span` that applies the correct styles.
    default:
      return <>{text}</>
  }
}
