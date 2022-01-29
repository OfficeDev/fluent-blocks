import { FluentPatternsProvider, ThemeName } from '../../lib'

import { Main } from '../../surfaces'
import { DescriptionListProps } from './DescriptionList'

export const DescriptionList = ({
  theme,
  ...props
}: DescriptionListProps & { theme: ThemeName }) => (
  <FluentPatternsProvider themeName={theme}>
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
  </FluentPatternsProvider>
)
