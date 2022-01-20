import { Main } from '../../surfaces'
import { FluentPatternsProvider, ThemeName } from '../../lib'
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
            items: [props, { ...props }, { ...props }, { ...props }],
          },
        },
      ]}
      title={[{ text: ' ' }]}
    />
  </FluentPatternsProvider>
)
