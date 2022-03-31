import { mergeClasses as cx } from '@fluentui/react-components'
import keys from 'lodash/keys'
import { ButtonProps } from '../../inputs'
import {
  TableProps as NaturalTableProps,
  CellProps as NaturalCellProps,
  ColumnProps as NaturalColumnProps,
} from '@fluent-blocks/schemas'
import { InlineContent, InlineSequenceOrString } from '../../inlines'
import { useCommonStyles } from '../../lib'
import { ShortInputs } from '../ShortInputs/ShortInputs'

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

export interface TableProps
  extends Omit<NaturalTableProps, 'columns' | 'rows' | 'caption'> {
  columns: Record<string, ColumnProps>
  rows: Record<string, RowProps>
  caption: InlineSequenceOrString
}

function isActionsCell(o: any): o is TableAction[] {
  return Array.isArray(o)
}

export const Table = ({
  caption,
  captionVisuallyHidden,
  columns,
  rows,
  rowTitlingColumn,
}: TableProps) => {
  const commonStyles = useCommonStyles()
  const colKeys = keys(columns)
  return (
    <table>
      <caption
        className={cx(captionVisuallyHidden && commonStyles.visuallyHidden)}
      >
        <InlineContent inlines={caption} />
      </caption>
      <thead>
        <tr>
          {colKeys.map((colKey) => {
            const column = columns[colKey]
            return (
              <th key={colKey} scope="col">
                <InlineContent inlines={column.title} />
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {keys(rows).map((rowKey) => {
          const row = rows[rowKey]
          return (
            <tr key={rowKey}>
              {colKeys.map((colKey) => {
                const cell = row[colKey]
                const cellContent = !cell ? null : isActionsCell(cell) ? (
                  <ShortInputs inputs={cell} />
                ) : (
                  <InlineContent inlines={cell.cell} />
                )
                return rowTitlingColumn === colKey ? (
                  <th scope="row" key={colKey}>
                    {cellContent}
                  </th>
                ) : (
                  <td key={colKey}>{cellContent}</td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
