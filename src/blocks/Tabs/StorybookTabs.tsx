import { TabsProps } from './Tabs'
import { FluentPatternsProvider, Theme } from '../../lib'
import { Main } from '../../surfaces'

export const Tabs = ({ theme, ...props }: TabsProps & { theme: Theme }) => (
  <FluentPatternsProvider theme={theme}>
    <Main title={[{ text: ' ' }]} blocks={[props]} />
  </FluentPatternsProvider>
)
