import { ActionPayload } from '../lib/actions'
import { ButtonProps } from '../inputs'
import { InlineSequenceOrString } from '../inlines'

export type TableAction = Omit<ButtonProps, 'variant' | 'size' | 'iconSize'> & {
  multiple?: boolean
}

export interface CellProps {
  cell: InlineSequenceOrString
}

export type SortVariant = 'alphabetical' | 'numerical' | 'chronological'

export interface ColumnProps {
  title: InlineSequenceOrString
  minWidth?: number
  hideable?: boolean
  textSelectable?: boolean
  hidePriority?: number
  sortVariant?: SortVariant
}

export interface RowProps {
  [columnKey: string]: CellProps | TableAction[] | undefined
  actions?: TableAction[]
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

export interface TableProps {
  table: {
    caption: InlineSequenceOrString
    captionVisuallyHidden?: boolean
    columns: Record<string, ColumnProps>
    rows: Record<string, RowProps>
    rowHeaderColumn: string
    truncate?: boolean
    selectable?: boolean
    maxWidthVariant?: 'viewportWidth' | 'textWidth'
    minWidthVariant?: 'auto' | 'fill'
  }
}
