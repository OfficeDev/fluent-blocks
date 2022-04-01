import {
  useArrowNavigationGroup,
  useFocusableGroup,
} from '@fluentui/react-tabster'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import keys from 'lodash/keys'
import { ButtonProps } from '../../inputs'
import {
  TableProps as NaturalTableProps,
  CellProps as NaturalCellProps,
  ColumnProps as NaturalColumnProps,
} from '@fluent-blocks/schemas'
import { InlineContent, InlineSequenceOrString } from '../../inlines'
import { key, useCommonStyles } from '../../lib'
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

const useTableStyles = makeStyles({
  root: { display: 'table' },
  inner: { display: 'contents' },
  row: { display: 'table-row' },
  cell: { display: 'table-cell' },
  caption: { display: 'table-caption' },
})

export const Table = (props: TableProps) => {
  const { caption, captionVisuallyHidden, columns, rows, rowTitlingColumn } =
    props
  const tableId = key(props)
  const commonStyles = useCommonStyles()
  const tableStyles = useTableStyles()
  const colKeys = keys(columns)

  const groupAttrs = {
    tabIndex: 0,
    ...useFocusableGroup({ tabBehavior: 'limited' }),
  }

  const rootInnerAttrs = {
    role: 'none',
    ...useArrowNavigationGroup({ axis: 'vertical' }),
  }

  const rowInnerAttrs = {
    role: 'none',
    ...useArrowNavigationGroup({ axis: 'horizontal' }),
  }

  return (
    <div
      role="grid"
      {...groupAttrs}
      className={tableStyles.root}
      aria-labelledby={`desc__${tableId}`}
    >
      <p
        id={`desc__${tableId}`}
        className={cx(
          captionVisuallyHidden
            ? commonStyles.visuallyHidden
            : tableStyles.caption
        )}
      >
        <InlineContent inlines={caption} />
      </p>
      <div {...rootInnerAttrs} className={tableStyles.inner}>
        <div role="row" {...groupAttrs} className={tableStyles.row}>
          {colKeys.map((colKey) => {
            const column = columns[colKey]
            return (
              <div
                role="columnheader"
                key={colKey}
                id={`ch__${colKey}`}
                {...groupAttrs}
                className={tableStyles.cell}
              >
                <InlineContent inlines={column.title} />
              </div>
            )
          })}
        </div>
        {keys(rows).map((rowKey) => {
          const row = rows[rowKey]
          return (
            <div
              role="row"
              key={rowKey}
              {...(rowTitlingColumn && { 'aria-labelledby': `rh__${rowKey}` })}
              {...groupAttrs}
              className={tableStyles.row}
            >
              <div {...rowInnerAttrs} className={tableStyles.inner}>
                {colKeys.map((colKey) => {
                  const cell = row[colKey]
                  const cellContent = !cell ? null : isActionsCell(cell) ? (
                    <ShortInputs inputs={cell} />
                  ) : (
                    <InlineContent inlines={cell.cell} />
                  )
                  return rowTitlingColumn === colKey ? (
                    <div
                      role="rowheader"
                      id={`rh__${rowKey}`}
                      key={colKey}
                      {...groupAttrs}
                      className={tableStyles.cell}
                    >
                      {cellContent}
                    </div>
                  ) : (
                    <div
                      role="gridcell"
                      key={colKey}
                      aria-labelledby={`${
                        rowTitlingColumn && `rh__${rowKey} `
                      }ch__${colKey}`}
                      {...groupAttrs}
                      className={tableStyles.cell}
                    >
                      {cellContent}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
