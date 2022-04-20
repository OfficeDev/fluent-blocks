import { TableInnerProps } from '../lib/tables'

export {
  RowProps,
  TableAction,
  CellProps,
  TableColumnProps,
  TableRowActivateAction,
  TableSelectedRowsAction,
  TableActionPayload,
} from '../lib/tables'

export interface TableProps {
  table: TableInnerProps
}
