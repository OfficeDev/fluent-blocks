import { Table as NaturalTable, TableProps } from './Table'
import {
  AccentScheme,
  FluentBlocksProvider,
  ThemeName,
  WithActionHandler,
} from '../../lib'
import { TableActionPayload } from '@fluent-blocks/schemas'
import { Button } from '../../inputs'

export const Table = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: TableProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
} & WithActionHandler<TableActionPayload>) => (
  <FluentBlocksProvider {...{ themeName, accentScheme, iconSpriteUrl }}>
    <Button type="action" label="Focus before" actionId="before" />
    <NaturalTable {...props} />
    <Button type="action" label="Focus after" actionId="before" />
  </FluentBlocksProvider>
)
