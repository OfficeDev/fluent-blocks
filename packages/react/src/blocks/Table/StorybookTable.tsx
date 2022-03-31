import { Table as NaturalTable, TableProps } from './Table'
import {
  AccentScheme,
  FluentBlocksProvider,
  ThemeName,
  WithActionHandler,
} from '../../lib'
import { TableActionPayload } from '@fluent-blocks/schemas'

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
      <NaturalTable {...props} />
    </FluentBlocksProvider>
  )
