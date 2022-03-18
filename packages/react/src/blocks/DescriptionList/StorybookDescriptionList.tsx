import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'

import { Main } from '../../surfaces'
import { DescriptionListProps } from './DescriptionList'

export const DescriptionList = ({
  themeName,
  accentScheme,
  basicSpriteUrl,
  ...props
}: DescriptionListProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  basicSpriteUrl: string
}) => (
  <FluentBlocksProvider {...{ themeName, accentScheme, basicSpriteUrl }}>
    <Main
      blocks={[
        {
          card: [
            {
              ...props,
            },
          ],
        },
      ]}
      title={[{ text: ' ' }]}
    />
  </FluentBlocksProvider>
)
