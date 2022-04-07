import { TableProps } from './Table'
import {
  AccentScheme,
  ActionHandler,
  ThemeName,
  WithActionHandler,
} from '../../lib'
import { TableActionPayload } from '@fluent-blocks/schemas'
import { View } from '../../views'

export const Table = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  onAction,
  ...props
}: TableProps['table'] & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
  onAction: ActionHandler<TableActionPayload>
} & WithActionHandler<TableActionPayload>) => (
  <View
    {...{ themeName, accentScheme, iconSpriteUrl, onAction }}
    main={{ title: ' ', blocks: [{ table: props }] }}
  />
)
