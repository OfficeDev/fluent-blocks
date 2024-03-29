import {
  DescribedInlineSequenceOrString,
  InlineSequenceOrString,
} from '../inlines'
import { ButtonProps } from '../inputs'
import { ActionPayload } from './actions'

export interface RowProps {
  [columnKey: string]: CellProps | TableAction[] | undefined
  actions?: string[]
}

export type TableAction = Omit<ButtonProps, 'variant' | 'size' | 'iconSize'> & {
  multiple?: boolean
}

export interface CellProps {
  cell: DescribedInlineSequenceOrString
}

export interface TableColumnProps {
  title: DescribedInlineSequenceOrString
  minWidth?: number
  hideable?: boolean
  hidePriority?: number
}

export interface TableRowActivateAction extends ActionPayload {
  actionId: 'activate'
  type: 'activate'
  row: string
}

export interface TableSelectedRowsAction extends ActionPayload {
  type: 'activate'
  rows: string[]
}

export type TableActionPayload =
  | TableRowActivateAction
  | TableSelectedRowsAction

export interface TableInnerProps {
  caption: InlineSequenceOrString
  captionVisuallyHidden?: boolean
  columns: Record<string, TableColumnProps>
  rows: Record<string, RowProps>
  rowHeaderColumn: string
  rowActions?: Record<string, Omit<TableAction, 'actionId'>>
  rowsActivable?: boolean
  wrap?: boolean
  maxWidthVariant?: 'viewportWidth' | 'textWidth'
  minWidthVariant?: 'auto' | 'fill'
  loading?: boolean
}
