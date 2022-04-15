import { MenuActionSequence } from '../lib/menu'
import { TableColumnProps, TableInnerProps } from '../lib/tables'
import { ToolbarProps } from './Toolbar'

export type SortVariant = 'alphabetical' | 'numerical' | 'chronological'

export interface ListColumnProps extends TableColumnProps {
  sortVariant?: SortVariant
  filterable?: boolean
  findable?: boolean
}

interface ListInnerProps
  extends TableInnerProps,
    Pick<ToolbarProps['toolbar'], 'iconSize' | 'buttonSize'> {
  pageSize?: number
  selectable?: boolean
  listActions?: MenuActionSequence
}

export interface ListProps {
  list: ListInnerProps
}
