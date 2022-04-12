import { ButtonProps } from '../../inputs'
import {
  TableProps as NaturalTableProps,
  CellProps as NaturalCellProps,
  TableColumnProps as NaturalTableColumnProps,
  SortVariant as NaturalSortVariant,
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
  extends Omit<NaturalTableColumnProps, 'title'> {
  title: InlineSequenceOrString
}

export interface RowProps {
  [columnKey: string]: CellProps | TableAction[] | undefined
  actions?: TableAction[]
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

export interface TableProps extends Omit<NaturalTableProps, 'table'> {
  table: Omit<NaturalTableProps['table'], 'columns' | 'rows' | 'caption'> & {
    columns: Record<string, TableColumnProps | ListColumnProps>
    rows: Record<string, RowProps>
    caption: InlineSequenceOrString
    onRowHeaderActivate?: ActionHandler<TableRowActivateAction>
  }
  contextualVariant?: 'block'
  contextualSortProps?: Partial<SortProps> & {
    setSort: (sortProps: SortProps | null) => void
  }
  contextualSelectable?: false
}
