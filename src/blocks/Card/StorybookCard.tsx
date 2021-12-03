import { Main } from '../../surfaces'
import { FluentPatternsProvider, Theme } from '../../lib'
import { CardProps } from './Card'

export const Card = ({ theme, ...props }: CardProps & { theme: Theme }) => (
  <FluentPatternsProvider theme={theme}>
    <Main blocks={[props]} title={[{ text: ' ' }]} />
  </FluentPatternsProvider>
)
