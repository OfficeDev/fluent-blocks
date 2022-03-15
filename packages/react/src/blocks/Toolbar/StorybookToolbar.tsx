import set from 'lodash/set'
import { ToolbarProps } from './Toolbar'
import { FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Toolbar = ({
  theme,
  buttonSize,
  ...props
}: ToolbarProps & {
  theme: ThemeName
  buttonSize: 'small' | 'medium' | 'large'
}) => (
  <FluentBlocksProvider themeName={theme}>
    <Main
      title={[{ text: ' ' }]}
      blocks={[{ ...set(props, 'toolbar.buttonSize', buttonSize) }]}
    />
  </FluentBlocksProvider>
)
