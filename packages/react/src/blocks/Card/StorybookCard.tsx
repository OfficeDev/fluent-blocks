import range from 'lodash/range'

import { AccentScheme, ThemeName } from '../../lib'
import { CardProps } from '../../props'
import { View } from '../../views'

export const BlockCard = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: CardProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
}) => (
  <View
    {...{
      themeName,
      accentScheme,
      iconSpriteUrl,
      main: { blocks: [props], title: ' ' },
    }}
  />
)

export const LayoutCard = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: CardProps & {
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
        blocks: [
          {
            layout: {
              variant: 'grid',
              items: range(3).map((i) => ({ item: { ...props } })),
            },
          },
        ],
        title: ' ',
      },
    }}
  ></View>
)
