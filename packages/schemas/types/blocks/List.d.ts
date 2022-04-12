import { TableInnerProps, TableColumnProps } from '../lib/tables'

export type SortVariant = 'alphabetical' | 'numerical' | 'chronological'

export interface ListColumnProps extends TableColumnProps {
  sortVariant?: SortVariant
}

interface ListInnerProps extends TableInnerProps {
  pageSize?: number
  selectable?: boolean
}

export interface ListProps {
  list: ListInnerProps
}
