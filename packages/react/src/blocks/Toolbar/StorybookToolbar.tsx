import set from 'lodash/set'
import { ToolbarProps } from './Toolbar'
import {
  AccentScheme,
  ActionHandler,
  FluentBlocksProvider,
  MenuAction,
  ThemeName,
} from '../../lib'
import { Main } from '../../surfaces'

export const Toolbar = ({
  themeName,
  accentScheme,
  onAction,
  buttonSize,
  iconSpriteUrl,
  ...props
}: {
  toolbar: Omit<ToolbarProps['toolbar'], 'buttonSize'>
  themeName: ThemeName
  accentScheme: AccentScheme
  onAction: ActionHandler<MenuAction>
  buttonSize: 'small' | 'medium' | 'large'
  iconSpriteUrl: string
}) => (
  <FluentBlocksProvider
    {...{ themeName, accentScheme, onAction, iconSpriteUrl }}
  >
    <Main
      title={[{ text: ' ' }]}
      blocks={[{ ...set(props, 'toolbar.buttonSize', buttonSize) }]}
    />
  </FluentBlocksProvider>
)
