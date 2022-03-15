import { ChartProps } from './Chart'
import { FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Chart = ({
  theme,
  ...props
}: ChartProps & { theme: ThemeName }) => (
  <FluentBlocksProvider themeName={theme}>
    <Main blocks={[{ media: props, variant: 'textWidth' }]} title={[' ']} />
  </FluentBlocksProvider>
)
