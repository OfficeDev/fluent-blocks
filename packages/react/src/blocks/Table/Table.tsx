import {
  ReactElement,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import debounce from 'lodash/debounce'
import keys from 'lodash/keys'
import {
  useArrowNavigationGroup,
  useFocusableGroup,
} from '@fluentui/react-tabster'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import { InlineContent } from '../../inlines'
import {
  key,
  rem,
  sx,
  useCommonStyles,
  useFluentBlocksContext,
} from '../../lib'
import { ShortInputs } from '../ShortInputs/ShortInputs'

import { TableAction, TableProps } from './table-properties'
import { getBreakpoints } from './tableBreakpoints'

function isActionsCell(o: any): o is TableAction[] {
  return Array.isArray(o)
}

const useTableStyles = makeStyles({
  root: { overflowX: 'auto' },
  grid: { display: 'table' },
  inner: { display: 'contents' },
  row: { display: 'table-row' },
  cell: { display: 'table-cell' },
  theadCell: {
    fontSize: rem(12),
    ...sx.padding(rem(8), rem(12)),
  },
  tbodyCell: {
    ...sx.padding(rem(12)),
    ...sx.borderBottom('1px', 'solid', 'var(--colorNeutralStroke2)'),
  },
  caption: { display: 'table-caption' },
})

export const Table = (props: TableProps) => {
  const {
    caption,
    captionVisuallyHidden,
    columns,
    rows,
    rowTitlingColumn,
    selectable = false,
    widthVariant = 'viewportWidth',
  } = props.table
  const { translations } = useFluentBlocksContext()
  const contextualVariant = props.contextualVariant || 'block'
  const tableId = key(props)
  const commonStyles = useCommonStyles()
  const tableStyles = useTableStyles()
  const colKeys = keys(columns)
  const rowKeys = keys(rows)
  const columnOrder = ['selection', ...colKeys, 'overflow']

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

  const breakpoints = useMemo(
    () =>
      getBreakpoints(
        columns,
        rowKeys.findIndex((rowKey) => rows[rowKey].hasOwnProperty('actions')) >=
          0,
        selectable
      ),
    [rows, columns]
  )

  const $table = useRef<HTMLDivElement | null>(null)

  const [inFlowColumns, setInFlowColumns] = useState<Set<string>>(
    // start by displaying all columns (in case of SSR)
    breakpoints.get(Infinity)!
  )

  const includeColumn = useCallback(
    (colKey: string) => inFlowColumns.has(colKey),
    [inFlowColumns]
  )

  const getNextColumnsInFlow = useCallback(() => {
    if ($table.current) {
      const widths = Array.from(breakpoints.keys()).sort(
        (a: number, b: number) => a - b
      )
      const firstBreak = widths.findIndex(
        (width) => width > $table.current!.clientWidth
      )
      // use the last width to not be greater than the client width, or zero if they all were
      return breakpoints.get(widths[Math.max(0, firstBreak - 1)])
    } else {
      return breakpoints.get(Infinity)
    }
  }, [])

  const debouncedUpdateTableLayout = useCallback(
    debounce(
      () => {
        if ($table.current) {
          const nextColumnsInFlow = getNextColumnsInFlow()
          console.log('[Resize]', nextColumnsInFlow, breakpoints)
          setInFlowColumns(nextColumnsInFlow!)
        }
      },
      100,
      { leading: false, trailing: true }
    ),
    []
  )

  useLayoutEffect(() => {
    document.defaultView?.addEventListener('resize', debouncedUpdateTableLayout)
    if ($table.current) {
      const nextColumnsInFlow = getNextColumnsInFlow()
      console.log('[Init]', nextColumnsInFlow, breakpoints)
      setInFlowColumns(nextColumnsInFlow!)
    }
    return () =>
      document.defaultView?.removeEventListener(
        'resize',
        debouncedUpdateTableLayout
      )
  }, [])

  return (
    <div
      role="none"
      ref={$table}
      className={cx(
        tableStyles.root,
        commonStyles.blockSpacing,
        widthVariant === 'textWidth' && commonStyles.mainContentWidth
      )}
    >
      <div
        role="grid"
        {...groupAttrs}
        className={cx(
          tableStyles.grid,
          contextualVariant === 'block' && commonStyles.centerBlock
        )}
        aria-labelledby={`desc__${tableId}`}
      >
        <p
          id={`desc__${tableId}`}
          className={cx(
            captionVisuallyHidden
              ? commonStyles.visuallyHidden
              : tableStyles.caption,
            commonStyles.mainContentWidth,
            commonStyles.centerBlock
          )}
        >
          <InlineContent inlines={caption} />
        </p>
        <div {...rootInnerAttrs} className={tableStyles.inner}>
          <div
            role="row"
            {...groupAttrs}
            className={tableStyles.row}
            aria-label={translations.thead}
          >
            <div {...rowInnerAttrs} className={tableStyles.inner}>
              {columnOrder.filter(includeColumn).map((colKey) => {
                switch (colKey) {
                  case 'overflow':
                  case 'selection':
                    return (
                      <div
                        role="columnheader"
                        key={colKey}
                        tabIndex={0}
                        id={`ch__${colKey}`}
                        className={cx(tableStyles.cell, tableStyles.theadCell)}
                      >
                        <span className={commonStyles.visuallyHidden}>
                          {translations[colKey]}
                        </span>
                      </div>
                    )
                  default:
                    return (
                      <div
                        role="columnheader"
                        key={colKey}
                        id={`ch__${colKey}`}
                        {...groupAttrs}
                        className={cx(tableStyles.cell, tableStyles.theadCell)}
                      >
                        <InlineContent inlines={columns[colKey].title} />
                      </div>
                    )
                }
              })}
            </div>
          </div>
          {rowKeys.map((rowKey) => {
            const row = rows[rowKey]
            return (
              <div
                role="row"
                key={rowKey}
                aria-labelledby={`rh__${rowKey}`}
                {...groupAttrs}
                className={tableStyles.row}
              >
                <div {...rowInnerAttrs} className={tableStyles.inner}>
                  {columnOrder.filter(includeColumn).map((colKey) => {
                    if (inFlowColumns.has(colKey)) {
                      const cell = row[colKey]
                      const cellContent =
                        colKey === 'overflow' ? (
                          <span>…</span>
                        ) : colKey === 'selection' ? (
                          <span>x</span>
                        ) : !cell ? null : isActionsCell(cell) ? (
                          <ShortInputs inputs={cell} />
                        ) : (
                          <InlineContent inlines={cell.cell} />
                        )
                      const cellElementProps = {
                        key: colKey,
                        ...groupAttrs,
                        className: cx(tableStyles.cell, tableStyles.tbodyCell),
                      }
                      return rowTitlingColumn === colKey ? (
                        <div
                          role="rowheader"
                          id={`rh__${rowKey}`}
                          {...cellElementProps}
                        >
                          {cellContent}
                        </div>
                      ) : (
                        <div
                          role="gridcell"
                          aria-labelledby={`rh__${rowKey} ch__${colKey}`}
                          {...cellElementProps}
                        >
                          {cellContent}
                        </div>
                      )
                    } else {
                      return null
                    }
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export type TableElement = ReactElement<TableProps, typeof Table>
export type TablePropsOrElement = TableProps | TableElement

function isTableProps(o: any): o is TableProps {
  return 'table' in o
}

function isTableElement(o: any): o is TableElement {
  return o?.type === Table
}

export function renderIfTable(o: any) {
  return isTableProps(o) ? <Table {...o} /> : isTableElement(o) ? o : null
}
