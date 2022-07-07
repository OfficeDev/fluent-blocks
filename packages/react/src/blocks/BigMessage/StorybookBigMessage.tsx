import { ButtonActionPayload } from '../../inputs'
import { AccentScheme, ThemeName } from '../../lib'
import { WithActionHandler } from '../../props'
import { View } from '../../views'
import { BigMessageProps } from './BigMessage'

export const BigMessage = ({
  themeName,
  accentScheme,
  onAction,
  iconSpriteUrl,
  ...props
}: BigMessageProps['message'] & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
} & WithActionHandler<ButtonActionPayload>) => (
  <View
    {...{
      themeName,
      accentScheme,
      onAction,
      iconSpriteUrl,
      main: {
        blocks: [
          { message: { ...props, variant: 'big', viewportHeight: false } },
        ],
        title: ' ',
      },
    }}
  />
)
