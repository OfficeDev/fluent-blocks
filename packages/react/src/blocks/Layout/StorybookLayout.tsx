import { AccentScheme, ThemeName } from '../../lib'
import { LayoutProps } from '../../props'
import { View } from '../../views'

export const Layout = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: LayoutProps & {
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
        title: '',
        blocks: [{ ...props }],
      },
    }}
  />
)
