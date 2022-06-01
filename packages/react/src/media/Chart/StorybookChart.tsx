import { AccentScheme, ThemeName } from '../../lib'
import { View } from '../../views'
import { ChartProps } from './Chart'

export const Chart = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: ChartProps & {
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
        blocks: [{ media: props, variant: 'textWidth' }],
        title: ' ',
      },
    }}
  />
)
