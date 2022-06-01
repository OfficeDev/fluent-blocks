import { AccentScheme, ThemeName } from '../../lib'
import { View } from '../../views'
import { DescriptionListProps } from './DescriptionList'

export const DescriptionList = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: DescriptionListProps & {
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
            card: {
              title: '',
              titleVisuallyHidden: true,
              body: [
                {
                  ...props,
                },
              ],
            },
          },
        ],
        title: ' ',
      },
    }}
  />
)
