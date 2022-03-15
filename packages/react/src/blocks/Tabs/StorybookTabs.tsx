import { TabsProps } from './Tabs'
import { FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Tabs = ({ theme, ...props }: TabsProps & { theme: ThemeName }) => (
  <FluentBlocksProvider themeName={theme}>
    <Main title={[{ text: ' ' }]} blocks={[{ card: [props] }]} />
  </FluentBlocksProvider>
)
