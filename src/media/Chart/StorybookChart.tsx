import { ChartProps } from './Chart'
import { FluentPatternsProvider, Theme } from '../../lib'
import { Main } from '../../surfaces'

export const Chart = ({ theme, ...props }: ChartProps & { theme: Theme }) => (
    <FluentPatternsProvider theme={theme}>
      <Main blocks={[{ media: props, variant: 'narrow' }]} title={[' ']} />
    </FluentPatternsProvider>
  )
