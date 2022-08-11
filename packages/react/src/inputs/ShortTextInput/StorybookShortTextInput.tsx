import { useState } from 'react'

import { SingleValueInputActionPayload } from '@fluent-blocks/schemas'

import iconSpriteUrl from '../../lib/storybookIconSpriteUrl'
import { View, ViewProps } from '../../views'
import { ShortTextInputProps } from './ShortTextInput'

export const ShortTextInput = ({
  textInput,
  ...props
}: ShortTextInputProps & ViewProps) => {
  const [validation, setValidation] = useState<
    ShortTextInputProps['textInput']['validation']
  >({ valence: 'pending', message: 'Type' })
  const onAction = ({ value }: SingleValueInputActionPayload) => {
    setValidation(
      value.length > 1
        ? { valence: 'valid', message: 'Ready' }
        : {
            valence: 'invalid',
            message: 'Too short',
          }
    )
  }
  return (
    <View
      key={'q'}
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
                    onAction,
                    ...(validation && { validation }),
                  },
                },
              ],
            },
          ],
        },
      }}
    />
  )
}
