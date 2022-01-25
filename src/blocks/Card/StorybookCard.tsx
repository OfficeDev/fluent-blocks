import range from 'lodash/range'

import { FluentPatternsProvider, ThemeName } from '../../lib'

import { Main } from '../../surfaces'
import { CardProps } from './Card'

export const BlockCard = ({
  theme,
  ...props
}: CardProps & { theme: ThemeName }) => (
  <FluentPatternsProvider themeName={theme}>
    <Main blocks={[props]} title={[{ text: ' ' }]} />
  </FluentPatternsProvider>
)

export const LayoutCard = ({
  theme,
  ...props
}: CardProps & { theme: ThemeName }) => (
  <FluentPatternsProvider themeName={theme}>
    <Main
      blocks={[
        {
          layout: {
            variant: 'grid',
            items: range(3).map((i) => ({ item: { ...props } })),
          },
        },
      ]}
      title={[{ text: ' ' }]}
    />
  </FluentPatternsProvider>
)
