import { TabsProps } from './Tabs'
import { FluentPatternsProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Tabs = ({ theme, ...props }: TabsProps & { theme: ThemeName }) => (
  <FluentPatternsProvider themeName={theme}>
    <Main title={[{ text: ' ' }]} blocks={[{ card: [props] }]} />
  </FluentPatternsProvider>
)
