import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'
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
  <FluentBlocksProvider {...{ themeName, accentScheme, iconSpriteUrl }}>
    <Main
      blocks={[
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
      ]}
      title={[{ text: ' ' }]}
    />
  </FluentBlocksProvider>
)
