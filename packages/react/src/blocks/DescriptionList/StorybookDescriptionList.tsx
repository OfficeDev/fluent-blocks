import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'

import { Main } from '../../surfaces'
import { DescriptionListProps } from './DescriptionList'

export const DescriptionList = ({
  themeName,
  accentScheme,
  ...props
}: DescriptionListProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
}) => (
  <FluentBlocksProvider {...{ themeName, accentScheme }}>
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
