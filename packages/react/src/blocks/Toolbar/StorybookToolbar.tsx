import { ToolbarProps } from './Toolbar'
import { FluentPatternsProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Toolbar = ({
  theme,
  ...props
}: ToolbarProps & { theme: ThemeName }) => (
  <FluentPatternsProvider themeName={theme}>
    <Main title={[{ text: ' ' }]} blocks={[{ ...props }]} />
  </FluentPatternsProvider>
)
