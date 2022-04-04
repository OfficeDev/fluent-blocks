import { ButtonProps } from '../../inputs'
import {
  TableProps as NaturalTableProps,
  CellProps as NaturalCellProps,
  ColumnProps as NaturalColumnProps,
} from '@fluent-blocks/schemas'
import { InlineSequenceOrString } from '../../inlines'

export type TableAction = Omit<ButtonProps, 'variant' | 'size' | 'iconSize'> & {
  multiple?: boolean
}

export interface CellProps extends Omit<NaturalCellProps, 'cell'> {
  cell: InlineSequenceOrString
}

export interface ColumnProps extends Omit<NaturalColumnProps, 'title'> {
  title: InlineSequenceOrString
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
  }
  contextualVariant?: 'block'
}
