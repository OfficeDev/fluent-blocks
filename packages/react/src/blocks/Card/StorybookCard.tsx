import range from 'lodash/range'

import { FluentBlocksProvider, ThemeName } from '../../lib'

import { Main } from '../../surfaces'
import { CardProps } from './card-properties'

export const BlockCard = ({
  theme,
  ...props
}: CardProps & { theme: ThemeName }) => (
  <FluentBlocksProvider themeName={theme}>
    <Main blocks={[props]} title={[{ text: ' ' }]} />
  </FluentBlocksProvider>
)

export const LayoutCard = ({
  theme,
  ...props
}: CardProps & { theme: ThemeName }) => (
  <FluentBlocksProvider themeName={theme}>
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
  </FluentBlocksProvider>
)
