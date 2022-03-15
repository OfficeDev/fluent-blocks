import { FluentBlocksProvider, ThemeName } from '../../lib'

import { Main } from '../../surfaces'
import { DescriptionListProps } from './DescriptionList'

export const DescriptionList = ({
  theme,
  ...props
}: DescriptionListProps & { theme: ThemeName }) => (
  <FluentBlocksProvider themeName={theme}>
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
