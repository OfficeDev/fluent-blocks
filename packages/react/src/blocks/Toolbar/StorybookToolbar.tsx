import set from 'lodash/set'
import { ToolbarProps } from './Toolbar'
import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Toolbar = ({
  themeName,
  accentScheme,
  buttonSize,
  ...props
}: {
  toolbar: Omit<ToolbarProps['toolbar'], 'buttonSize'>
  themeName: ThemeName
  accentScheme: AccentScheme
  buttonSize: 'small' | 'medium' | 'large'
}) => (
  <FluentBlocksProvider {...{ themeName, accentScheme }}>
    <Main
      title={[{ text: ' ' }]}
      blocks={[{ ...set(props, 'toolbar.buttonSize', buttonSize) }]}
    />
  </FluentBlocksProvider>
)
