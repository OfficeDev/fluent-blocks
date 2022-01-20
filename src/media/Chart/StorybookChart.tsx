import { ChartProps } from './Chart'
import { FluentPatternsProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Chart = ({
  theme,
  ...props
}: ChartProps & { theme: ThemeName }) => (
  <FluentPatternsProvider themeName={theme}>
    <Main blocks={[{ media: props, variant: 'textWidth' }]} title={[' ']} />
  </FluentPatternsProvider>
)
