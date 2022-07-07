import { AccentScheme, ThemeName } from '../../lib'
import { View } from '../../views'
import { IllustrationProps } from './Illustration'

export const Illustration = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: IllustrationProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
}) => (
  <View
    {...{
      themeName,
      accentScheme,
      iconSpriteUrl,
      main: {
        blocks: [{ media: props, variant: 'narrow' }],
        title: ' ',
      },
    }}
  />
)
