import set from 'lodash/set'

import { AccentScheme, ThemeName } from '../../lib'
import { ActionHandler, ActionPayload } from '../../props'
import { View } from '../../views'
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
  <View
    {...{
      themeName,
      accentScheme,
      onAction,
      iconSpriteUrl,
      main: {
        title: ' ',
        blocks: [{ ...set(props, 'toolbar.buttonSize', buttonSize) }],
      },
    }}
  />
)
