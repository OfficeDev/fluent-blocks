import debounce from 'lodash/debounce'
import get from 'lodash/get'
import keys from 'lodash/keys'
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { Checkbox } from '@fluentui/react-checkbox'
import {
  Button as FluentButton,
  mergeClasses as cx,
  makeStyles,
} from '@fluentui/react-components'
import {
  useArrowNavigationGroup,
  useFocusableGroup,
} from '@fluentui/react-tabster'

import { InlineContent } from '../../inlines'
import { Overflow } from '../../inputs'
import {
  ListColumnProps,
  MenuItemSequence,
  TableProps as NaturalTableProps,
  TableAction,
  key,
  rem,
  sx,
  useCommonStyles,
  useFluentBlocksContext,
} from '../../lib'
import { ShortInputs } from '../ShortInputs/ShortInputs'
import { getBreakpoints } from './tableBreakpoints'

function isActionsCell(o: any): o is TableAction[] {
  return Array.isArray(o)
}

export type TableProps = NaturalTableProps

const useTableStyles = makeStyles({
  root: {
    overflowX: 'auto',
    ...sx.padding(rem(8)),
    marginBlockStart: rem(-8),
    marginBlockEnd: rem(-8),
  },
  grid: {},
  'grid--fill': { minWidth: '100%' },
  inner: { display: 'contents' },
  row: { display: 'flex', width: '100%' },
  cell: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    flexBasis: 0,
    boxSizing: 'border-box',
  },
  theadCell: {
    fontSize: rem(12),
    ...sx.padding(rem(8), rem(12)),
  },
  tbodyCell: {
    ...sx.padding(rem(12)),
    ...sx.borderBottom('1px', 'solid', 'var(--colorNeutralStroke2)'),
  },
  tbodyCellWithButtonsContent: {
    ...sx.margin(rem(-12)),
  },
  tbodyCellAlignEnd: {
    justifyContent: 'flex-end',
  },
  activableRowHeader: {
    color: 'inherit',
    fontWeight: 'var(--fontWeightMedium)',
    '&:hover': {
      ...sx.textDecoration('underline'),
    },
    '&:focus': {
      ...sx.textDecoration('underline'),
    },
  },
  caption: {},
})

function getContentColumnsHidden(
  inFlowColumns: Set<string>,
  colKeys: string[]
) {
  const inFlowContentColumns = new Set(inFlowColumns)
  inFlowContentColumns.delete('selection')
  inFlowContentColumns.delete('overflow')
  return inFlowContentColumns.size < colKeys.length
}

const defaultMinWidth = 120
const accessoryWidth = 32

const colWidthClassName = (colKey: string) => `${colKey}-width`

export const Table = (props: TableProps) => {
  const {
    caption,
    captionVisuallyHidden,
    columns,
    rows,
    rowHeaderColumn,
    onRowHeaderActivate,
    maxWidthVariant = 'viewportWidth',
    minWidthVariant = 'fill',
  } = props.table

  const sort = props.contextualSortProps?.setSort
    ? props.contextualSortProps
    : null

  const select = props.contextualSelectionProps?.setSelection
    ? props.contextualSelectionProps
    : null

  const { translations } = useFluentBlocksContext()

  const contextualVariant = props.contextualVariant || 'block'
  const tableId = key(props)

  const commonStyles = useCommonStyles()
  const tableStyles = useTableStyles()

  const colKeys = keys(columns)
  const rowKeys = keys(rows)
  const columnOrder = ['selection', ...colKeys, 'overflow']

  const groupAttrs = {
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
        !!select
      ),
    [rows, columns, select]
  )

  const $table = useRef<HTMLDivElement | null>(null)

  const [inFlowColumns, setInFlowColumns] = useState<Set<string>>(
    // start by displaying all columns (in case of SSR)
    breakpoints.get(Infinity)!
  )

  const [contentColumnsHidden, setContentColumnsHidden] =
    useState<boolean>(false)

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
          setInFlowColumns(nextColumnsInFlow!)
          setContentColumnsHidden(
            getContentColumnsHidden(nextColumnsInFlow!, colKeys)
          )
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
      setInFlowColumns(nextColumnsInFlow!)
      setContentColumnsHidden(
        getContentColumnsHidden(nextColumnsInFlow!, colKeys)
      )
    }
    return () =>
      document.defaultView?.removeEventListener(
        'resize',
        debouncedUpdateTableLayout
      )
  }, [])

  const rootRowHeaderActivate = useCallback(
    ({ target }: MouseEvent<HTMLButtonElement>) =>
      onRowHeaderActivate &&
      onRowHeaderActivate({
        type: 'activate',
        actionId: 'activate',
        row: get(target, ['dataset', 'row']),
      }),
    []
  )

  const rootSelectActivate = useCallback(
    ({ target }: ChangeEvent<EventTarget>) => {
      const rowKey = get(target, ['dataset', 'row'])
      if (rowKey && select) {
        const nextSelection = new Set(select.selection)
        nextSelection[get(target, ['checked'], false) ? 'add' : 'delete'](
          rowKey
        )
        select.setSelection(nextSelection)
      }
    },
    [select]
  )

  const getSortOptions = useCallback(
    (colKey: string, { sortVariant }: ListColumnProps): MenuItemSequence => {
      switch (sortVariant) {
        // todo: implement other sort types
        default:
          return [
            {
              label: translations['sort--alphabetical-ascending'],
              actionId: `${colKey}:sort--alphabetical-ascending`,
              onAction: () =>
                sort?.setSort({ sortColumn: colKey, sortOrder: 'ascending' }),
              type: 'action',
            },
            {
              label: translations['sort--alphabetical-descending'],
              actionId: `${colKey}:sort--alphabetical-descending`,
              onAction: () =>
                sort?.setSort({ sortColumn: colKey, sortOrder: 'descending' }),
              type: 'action',
            },
          ]
      }
    },
    [translations]
  )

  return (
    <div
      role="none"
      ref={$table}
      className={cx(
        tableStyles.root,
        commonStyles.blockSpacing,
        commonStyles.centerBlock,
        maxWidthVariant === 'textWidth' && commonStyles.mainContentWidth
      )}
    >
      <style>
        {Array.from(inFlowColumns).reduce((acc: string, colKey: string) => {
          if (colKey === 'selection' || colKey === 'overflow') {
            return `${acc}.${colWidthClassName(colKey)} { flex-basis: ${rem(
              accessoryWidth
            )}; flex-grow: 0; flex-shrink: 0; }`
          } else {
            const minWidth = get(columns, [colKey, 'minWidth'], defaultMinWidth)
            return `${acc}.${colWidthClassName(colKey)} { min-width: ${rem(
              minWidth
            )}; flex-grow: ${minWidth}; }\n`
          }
        }, '')}
      </style>
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

      <div
        role="grid"
        tabIndex={0}
        {...groupAttrs}
        className={cx(
          tableStyles.grid,
          minWidthVariant === 'fill' && tableStyles['grid--fill'],
          contextualVariant === 'block' && commonStyles.centerBlock
        )}
        aria-labelledby={`desc__${tableId}`}
        aria-colcount={inFlowColumns.size}
        aria-rowcount={rowKeys.length + 1}
      >
        <div {...rootInnerAttrs} className={tableStyles.inner}>
          <div
            role="row"
            tabIndex={0}
            {...groupAttrs}
            className={tableStyles.row}
            aria-label={translations.thead}
          >
            <div {...rowInnerAttrs} className={tableStyles.inner}>
              {columnOrder.filter(includeColumn).map((colKey, ci) => {
                const cellElementProps = {
                  role: 'columnheader',
                  tabIndex: 0,
                  key: colKey,
                  id: `ch__${colKey}`,
                  'aria-colindex': ci + 1,
                  'aria-rowindex': 1,
                  className: `${cx(
                    tableStyles.cell,
                    tableStyles.theadCell
                  )} ${colWidthClassName(colKey)}`,
                }

                switch (colKey) {
                  case 'overflow':
                  case 'selection':
                    return (
                      <div {...cellElementProps} tabIndex={0}>
                        <span className={commonStyles.visuallyHidden}>
                          {translations[colKey]}
                        </span>
                      </div>
                    )
                  default:
                    return (
                      <div {...cellElementProps} {...groupAttrs}>
                        <InlineContent inlines={columns[colKey].title} />
                        {sort &&
                          columns[colKey].hasOwnProperty('sortVariant') && (
                            <Overflow
                              buttonSize="small"
                              triggerLabel={translations.sortOptions}
                              overflow={getSortOptions(colKey, columns[colKey])}
                              triggerIcon={
                                sort?.sortColumn === colKey
                                  ? sort?.sortOrder === 'ascending'
                                    ? 'arrow_up'
                                    : 'arrow_down'
                                  : 'arrow_sort'
                              }
                            />
                          )}
                      </div>
                    )
                }
              })}
            </div>
          </div>

          {rowKeys.map((rowKey, ri) => {
            const row = rows[rowKey]

            return (
              <div
                role="row"
                tabIndex={0}
                key={rowKey}
                aria-labelledby={`rh__${rowKey}`}
                {...groupAttrs}
                className={tableStyles.row}
              >
                <div {...rowInnerAttrs} className={tableStyles.inner}>
                  {columnOrder.filter(includeColumn).map((colKey, ci) => {
                    const cell = row[colKey]
                    const cellIsActions = isActionsCell(cell)
                    const cellHasButtons =
                      colKey === 'overflow' ||
                      cellIsActions ||
                      (onRowHeaderActivate && rowHeaderColumn === colKey)

                    const cellContent =
                      colKey === 'overflow' ? (
                        contentColumnsHidden || row.actions ? (
                          <div
                            className={tableStyles.tbodyCellWithButtonsContent}
                          >
                            <Overflow
                              overflow={[
                                ...(contentColumnsHidden
                                  ? [
                                      {
                                        type: 'action' as 'action',
                                        label: translations.viewAllDetails,
                                        actionId: `${rowKey}__details`,
                                      },
                                      { type: 'divider' as 'divider' },
                                    ]
                                  : []),
                                ...(row.actions || []),
                              ]}
                            />
                          </div>
                        ) : null
                      ) : colKey === 'selection' ? (
                        <Checkbox
                          checked={!!select?.selection.has(rowKey)}
                          data-row={rowKey}
                          onChange={rootSelectActivate}
                          className={tableStyles.tbodyCellWithButtonsContent}
                        />
                      ) : !cell ? null : cellIsActions ? (
                        <div
                          className={tableStyles.tbodyCellWithButtonsContent}
                        >
                          <ShortInputs inputs={cell} />
                        </div>
                      ) : (
                        <InlineContent inlines={cell.cell} />
                      )

                    const cellElementProps = {
                      key: colKey,
                      ...(!cellHasButtons && {
                        tabIndex: 0,
                      }),
                      ...groupAttrs,
                      className: `${cx(
                        tableStyles.cell,
                        tableStyles.tbodyCell,
                        colKey === 'overflow' && tableStyles.tbodyCellAlignEnd
                      )} ${colWidthClassName(colKey)}`,
                      'aria-colindex': ci + 1,
                      'aria-rowindex': ri + 2,
                    }

                    return rowHeaderColumn === colKey ? (
                      <div
                        role="rowheader"
                        id={`rh__${rowKey}`}
                        aria-describedby={`ch__${colKey}`}
                        {...cellElementProps}
                      >
                        {cellIsActions ? (
                          cellContent
                        ) : onRowHeaderActivate ? (
                          <FluentButton
                            className={cx(
                              tableStyles.activableRowHeader,
                              tableStyles.tbodyCellWithButtonsContent
                            )}
                            appearance="transparent"
                            data-row={rowKey}
                            onClick={rootRowHeaderActivate}
                          >
                            {cellContent}
                          </FluentButton>
                        ) : (
                          cellContent
                        )}
                      </div>
                    ) : (
                      <div
                        role="gridcell"
                        {...{
                          [colKey === 'selection' || colKey === 'overflow'
                            ? 'aria-labelledby'
                            : 'aria-describedby']: `rh__${rowKey} ch__${colKey}`,
                        }}
                        {...cellElementProps}
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
