import { Table as NaturalTable, TableProps } from './Table'
import { AccentScheme, ThemeName, WithActionHandler } from '../../lib'
import { TableActionPayload } from '@fluent-blocks/schemas'
import { Button } from '../../inputs'
import { View } from '../../views'

export const Table = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: TableProps['table'] & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
} & WithActionHandler<TableActionPayload>) => (
  <View
    {...{ themeName, accentScheme, iconSpriteUrl }}
    main={{ title: ' ', blocks: [{ table: props }] }}
  />
)
