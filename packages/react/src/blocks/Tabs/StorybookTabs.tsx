import { TabsProps } from './Tabs'
import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Tabs = ({
  themeName,
  accentScheme,
  ...props
}: TabsProps & { themeName: ThemeName; accentScheme: AccentScheme }) => (
  <FluentBlocksProvider {...{ themeName, accentScheme }}>
    <Main title={[{ text: ' ' }]} blocks={[{ card: [props] }]} />
  </FluentBlocksProvider>
)
