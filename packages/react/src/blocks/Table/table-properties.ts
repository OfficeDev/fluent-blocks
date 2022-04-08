import { ButtonProps } from '../../inputs'
import {
  TableProps as NaturalTableProps,
  CellProps as NaturalCellProps,
  TableColumnProps as NaturalTableColumnProps,
  TableRowActivateAction,
} from '@fluent-blocks/schemas'
import { InlineSequenceOrString } from '../../inlines'
import { ActionHandler } from '../../lib'

export type TableAction = Omit<ButtonProps, 'variant' | 'size' | 'iconSize'> & {
  multiple?: boolean
}

export interface CellProps extends Omit<NaturalCellProps, 'cell'> {
  cell: InlineSequenceOrString
}

export interface TableColumnProps
  extends Omit<NaturalTableColumnProps, 'title' | 'sortVariant'> {
  title: InlineSequenceOrString
}

export interface RowProps {
  [columnKey: string]: CellProps | TableAction[] | undefined
  actions?: TableAction[]
}

export type SortOrder = 'ascending' | 'descending'

export interface TableProps extends Omit<NaturalTableProps, 'table'> {
  table: Omit<NaturalTableProps['table'], 'columns' | 'rows' | 'caption'> & {
    columns: Record<string, TableColumnProps>
    rows: Record<string, RowProps>
    caption: InlineSequenceOrString
    onRowHeaderActivate?: ActionHandler<TableRowActivateAction>
  }
  contextualVariant?: 'block'
  contextualSortProps?: {
    setSort: (column: string, sortOrder: SortOrder) => void
    column?: string
    sortOrder?: SortOrder
  }
}
