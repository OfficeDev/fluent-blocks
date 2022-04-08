import { ListProps } from './List'
import {
  AccentScheme,
  ActionHandler,
  ThemeName,
  WithActionHandler,
} from '../../lib'
import { TableActionPayload } from '@fluent-blocks/schemas'
import { View } from '../../views'

export const List = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  onAction,
  ...props
}: ListProps['list'] & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
  onAction: ActionHandler<TableActionPayload>
} & WithActionHandler<TableActionPayload>) => (
  <View
    {...{ themeName, accentScheme, iconSpriteUrl, onAction }}
    main={{ title: ' ', blocks: [{ list: props }] }}
  />
)
