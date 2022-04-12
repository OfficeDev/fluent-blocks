import { InlineSequenceOrString } from '../inlines'
import { ButtonProps } from '../inputs'
import { ActionPayload } from './actions'

export interface RowProps {
  [columnKey: string]: CellProps | TableAction[] | undefined
  actions?: TableAction[]
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

export interface TableSelectedRowsActivateAction extends ActionPayload {
  type: 'activate'
  rows: string[]
}

export type TableActionPayload =
  | TableRowActivateAction
  | TableSelectedRowsActivateAction

export interface TableInnerProps {
  caption: InlineSequenceOrString
  captionVisuallyHidden?: boolean
  columns: Record<string, TableColumnProps>
  rows: Record<string, RowProps>
  rowHeaderColumn: string
  truncate?: boolean
  maxWidthVariant?: 'viewportWidth' | 'textWidth'
  minWidthVariant?: 'auto' | 'fill'
}
