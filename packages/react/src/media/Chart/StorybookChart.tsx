import { ChartProps } from './Chart'
import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Chart = ({
  themeName,
  accentScheme,
  basicSpriteUrl,
  ...props
}: ChartProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  basicSpriteUrl: string
}) => (
  <FluentBlocksProvider {...{ themeName, accentScheme, basicSpriteUrl }}>
    <Main blocks={[{ media: props, variant: 'textWidth' }]} title={[' ']} />
  </FluentBlocksProvider>
)
