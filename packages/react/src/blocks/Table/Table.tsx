import { getGroupper, getMover } from 'tabster'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import keys from 'lodash/keys'
import { ButtonProps } from '../../inputs'
import {
  TableProps as NaturalTableProps,
  CellProps as NaturalCellProps,
  ColumnProps as NaturalColumnProps,
} from '@fluent-blocks/schemas'
import { InlineContent, InlineSequenceOrString } from '../../inlines'
import {
  useCommonStyles,
  useTabster,
  useTabsterAttributes,
  focusableGroup,
  arrowNavigationGroup,
} from '../../lib'
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
  inner: { display: 'contents' },
})

export const Table = ({
  caption,
  captionVisuallyHidden,
  columns,
  rows,
  rowTitlingColumn,
}: TableProps) => {
  const commonStyles = useCommonStyles()
  const tableStyles = useTableStyles()
  const colKeys = keys(columns)

  const tabster = useTabster()
  if (tabster) {getMover(tabster)}
  if (tabster) {getGroupper(tabster)}

  const horizontalKeebProps = arrowNavigationGroup(tabster, {
    axis: 'horizontal',
  })
  const verticalKeebProps = arrowNavigationGroup(tabster, {
    axis: 'vertical',
  })
  const groupProps = focusableGroup(tabster, { tabBehavior: 'limited' })

  const groupAttrs = {
    tabIndex: 0,
    ...useTabsterAttributes(groupProps),
  }

  const rootInnerAttrs = {
    role: 'none',
    ...useTabsterAttributes(verticalKeebProps),
  }

  const rowInnerAttrs = {
    role: 'none',
    ...useTabsterAttributes(horizontalKeebProps),
  }

  return (
    <table {...groupAttrs}>
      <caption
        className={cx(captionVisuallyHidden && commonStyles.visuallyHidden)}
      >
        <InlineContent inlines={caption} />
      </caption>
      <div {...rootInnerAttrs} className={tableStyles.inner}>
        <thead>
          <tr {...groupAttrs}>
            {colKeys.map((colKey) => {
              const column = columns[colKey]
              return (
                <th key={colKey} {...groupAttrs} scope="col">
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
              <tr key={rowKey} {...groupAttrs}>
                <div {...rowInnerAttrs} className={tableStyles.inner}>
                  {colKeys.map((colKey) => {
                    const cell = row[colKey]
                    const cellContent = !cell ? null : isActionsCell(cell) ? (
                      <ShortInputs inputs={cell} />
                    ) : (
                      <InlineContent inlines={cell.cell} />
                    )
                    return rowTitlingColumn === colKey ? (
                      <th scope="row" key={colKey} {...groupAttrs}>
                        {cellContent}
                      </th>
                    ) : (
                      <td key={colKey} {...groupAttrs}>
                        {cellContent}
                      </td>
                    )
                  })}
                </div>
              </tr>
            )
          })}
        </tbody>
      </div>
    </table>
  )
}
