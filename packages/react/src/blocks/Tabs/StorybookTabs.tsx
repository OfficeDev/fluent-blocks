import { AccentScheme, ThemeName } from '../../lib'
import { View } from '../../views'
import { TabsProps } from './Tabs'

export const Tabs = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: TabsProps & {
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
        title: ' ',
        blocks: [
          { card: { title: '', titleVisuallyHidden: true, body: [props] } },
        ],
      },
    }}
  />
)
