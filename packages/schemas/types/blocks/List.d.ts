import { TableInnerProps, TableColumnProps } from '../lib/tables'

export type SortVariant = 'alphabetical' | 'numerical' | 'chronological'

interface ListColumnProps extends TableColumnProps {
  sortVariant?: SortVariant
}

interface ListInnerProps extends TableInnerProps {
  pageSize?: number
}

export interface ListProps {
  list: ListInnerProps
}
