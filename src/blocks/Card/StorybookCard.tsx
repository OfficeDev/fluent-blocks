import { Main } from '../../surfaces'
import { FluentPatternsProvider, Theme } from '../../lib'
import { CardProps } from './Card'

export const BlockCard = ({
  theme,
  ...props
}: CardProps & { theme: Theme }) => (
  <FluentPatternsProvider theme={theme}>
    <Main blocks={[props]} title={[{ text: ' ' }]} />
  </FluentPatternsProvider>
)

export const LayoutCard = ({
  theme,
  ...props
}: CardProps & { theme: Theme }) => (
  <FluentPatternsProvider theme={theme}>
    <Main
      blocks={[
        {
          layout: {
            variant: 'grid',
            items: [props, { ...props }, { ...props }, { ...props }],
          },
        },
      ]}
      title={[{ text: ' ' }]}
    />
  </FluentPatternsProvider>
)
