import set from 'lodash/set'
import { ToolbarProps } from './Toolbar'
import {
  AccentScheme,
  ActionHandler,
  FluentBlocksProvider,
  ThemeName,
} from '../../lib'
import { Main } from '../../surfaces'

export const Toolbar = ({
  themeName,
  accentScheme,
  onAction,
  buttonSize,
  ...props
}: {
  toolbar: Omit<ToolbarProps['toolbar'], 'buttonSize'>
  themeName: ThemeName
  accentScheme: AccentScheme
  onAction: ActionHandler
  buttonSize: 'small' | 'medium' | 'large'
}) => (
  <FluentBlocksProvider {...{ themeName, accentScheme, onAction }}>
    <Main
      title={[{ text: ' ' }]}
      blocks={[{ ...set(props, 'toolbar.buttonSize', buttonSize) }]}
    />
  </FluentBlocksProvider>
)
