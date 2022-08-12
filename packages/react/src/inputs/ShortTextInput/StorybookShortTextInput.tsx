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
          blocks: [
            {
              inputs: [
                {
                  textInput: {
                    ...textInput,
                    initialValidation: {
                      valence: 'pending',
                      message: '',
                    },
                    validator: {
                      validator: 'length',
                      min: 2,
                      max: 24,
                      invalidMessage: 'Too short or too long.',
                      validMessage: 'Looks good!',
                    },
                  },
                },
              ],
            },
          ],
        },
      }}
    />
  )
