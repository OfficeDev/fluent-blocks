import { ChartProps } from './Chart'
import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Chart = ({
  themeName,
  accentScheme,
  ...props
}: ChartProps & { themeName: ThemeName; accentScheme: AccentScheme }) => (
  <FluentBlocksProvider {...{ themeName, accentScheme }}>
    <Main blocks={[{ media: props, variant: 'textWidth' }]} title={[' ']} />
  </FluentBlocksProvider>
)
