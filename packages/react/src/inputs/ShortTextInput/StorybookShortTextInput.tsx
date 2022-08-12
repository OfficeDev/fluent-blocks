import iconSpriteUrl from '../../lib/storybookIconSpriteUrl'
import { CustomValidator } from '../../props'
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
                  validator: ((value?: string) => {
                    const str = value || ''
                    return {
                      valence: str.length > 2 ? 'valid' : 'invalid',
                      message: `Length is ${str.length}`,
                    }
                  }) as CustomValidator,
                },
              },
            ],
          },
        ],
      },
    }}
  />
)
