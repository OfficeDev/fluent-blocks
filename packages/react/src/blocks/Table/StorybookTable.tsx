import { TableActionPayload } from '@fluent-blocks/schemas'

import { AccentScheme, ThemeName } from '../../lib'
import { ActionHandler, WithActionHandler } from '../../props'
import { View } from '../../views'
import { TableProps } from './Table'

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
