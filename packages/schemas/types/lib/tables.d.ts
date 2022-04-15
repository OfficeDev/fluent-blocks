import { InlineSequenceOrString } from '../inlines'
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
  cell: InlineSequenceOrString
}

export interface TableColumnProps {
  title: InlineSequenceOrString
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
  rowActions: Record<string, Omit<TableAction, 'actionId'>>
  rowHeaderColumn: string
  rowsActivable?: boolean
  wrap?: boolean
  maxWidthVariant?: 'viewportWidth' | 'textWidth'
  minWidthVariant?: 'auto' | 'fill'
}
