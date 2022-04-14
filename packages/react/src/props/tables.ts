import {
  CellProps as NaturalCellProps,
  SortVariant as NaturalSortVariant,
  TableColumnProps as NaturalTableColumnProps,
  TableProps as NaturalTableProps,
  TableActionPayload,
} from '@fluent-blocks/schemas'

import { InlineSequenceOrString } from '../inlines'
import { ButtonProps } from '../inputs'
import { WithActionHandler } from './actions'

export type TableAction = Omit<ButtonProps, 'variant' | 'size' | 'iconSize'> & {
  multiple?: boolean
}

export interface CellProps extends Omit<NaturalCellProps, 'cell'> {
  cell: InlineSequenceOrString
}

export interface TableColumnProps
  extends Omit<NaturalTableColumnProps, 'title'> {
  title: InlineSequenceOrString
}

export interface RowProps {
  [columnKey: string]: CellProps | string[] | undefined
  actions?: string[]
}

export type SortPredicate = (a: any, b: any) => number

export type SortVariant = NaturalSortVariant | SortPredicate

export interface ListColumnProps extends TableColumnProps {
  sortVariant?: SortVariant
}

export type SortOrder = 'ascending' | 'descending'

export interface SortProps {
  sortColumn: string
  sortOrder: SortOrder
}

export interface TableProps
  extends Omit<NaturalTableProps, 'table'>,
    WithActionHandler<TableActionPayload> {
  table: Omit<
    NaturalTableProps['table'],
    'columns' | 'rows' | 'caption' | 'rowActions'
  > & {
    columns: Record<string, TableColumnProps | ListColumnProps>
    rows: Record<string, RowProps>
    rowActions: Record<string, Omit<TableAction, 'actionId'>>
    caption: InlineSequenceOrString
  }
  contextualVariant?: 'block'
  contextualSortProps?: Partial<SortProps> & {
    setSort: (sortProps: SortProps | null) => void
  }
  contextualSelectionProps?: {
    selection: Set<string>
    setSelection: (selection: Set<string>) => void
  }
}
