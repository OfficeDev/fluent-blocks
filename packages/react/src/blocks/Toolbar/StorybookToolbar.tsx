import set from 'lodash/set'

import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { ActionHandler, ActionPayload } from '../../props'
import { Main } from '../../surfaces'
import { ToolbarProps } from './Toolbar'

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
  onAction: ActionHandler<ActionPayload>
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
