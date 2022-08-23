import iconSpriteUrl from '../../lib/storybookIconSpriteUrl'
import { View, ViewProps } from '../../views'
import { ShortTextInputProps } from './ShortTextInput'

export const ShortTextInput = ({
  textInput,
  ...props
}: ShortTextInputProps & ViewProps) => (
  <View
    {...{
      iconSpriteUrl,
      ...props,
      main: {
        title: '',
        blocks: [{ inputs: [{ textInput }] }],
      },
    }}
  />
)
