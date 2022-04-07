import { ButtonProps } from '../../inputs'
import {
  TableProps as NaturalTableProps,
  CellProps as NaturalCellProps,
  ColumnProps as NaturalColumnProps,
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

export type SortPredicate = (a: any, b: any) => number

export interface ColumnProps
  extends Omit<NaturalColumnProps, 'title' | 'sortVariant'> {
  title: InlineSequenceOrString
  sortVariant: NaturalSortVariant | SortPredicate
}

export interface RowProps {
  [columnKey: string]: CellProps | TableAction[] | undefined
  actions?: TableAction[]
}

export interface TableProps extends Omit<NaturalTableProps, 'table'> {
  table: Omit<NaturalTableProps['table'], 'columns' | 'rows' | 'caption'> & {
    columns: Record<string, ColumnProps>
    rows: Record<string, RowProps>
    caption: InlineSequenceOrString
    onRowHeaderActivate?: ActionHandler<TableRowActivateAction>
  }
  contextualVariant?: 'block'
}
