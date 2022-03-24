import { ChartProps } from './Chart'
import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Chart = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: ChartProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
}) => (
  <FluentBlocksProvider {...{ themeName, accentScheme, iconSpriteUrl }}>
    <Main blocks={[{ media: props, variant: 'textWidth' }]} title={[' ']} />
  </FluentBlocksProvider>
)
