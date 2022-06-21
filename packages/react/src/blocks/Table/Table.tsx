import get from 'lodash/get'
import keys from 'lodash/keys'
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'

import { TableRowActivateAction } from '@fluent-blocks/schemas'
import {
  Checkbox,
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
  key,
  rem,
  sx,
  useCommonStyles,
  useFluentBlocksContext,
  useLayoutResize,
} from '../../lib'
import { ListColumnProps, MenuItemSequence, TableProps } from '../../props'
import { ShortInputs } from '../ShortInputs/ShortInputs'
import { getBreakpoints } from './tableBreakpoints'

function isActionsCell(o: any): o is string[] {
  return Array.isArray(o)
}

const useTableStyles = makeStyles({
  root: {
    marginBlockStart: rem(-8),
    marginBlockEnd: rem(-8),
    ...sx.padding(rem(8)),
  },
  rootSpacingAdjust: {
    display: 'flex',
    marginInlineStart: rem(-16),
    marginInlineEnd: rem(-16),
  },
  rootInner: {
    ...sx.flex(1, 0, '0'),
    width: '0',
    overflowX: 'auto',
    ...sx.padding(rem(4)),
  },
  grid: {},
  'grid--fill': { minWidth: '100%' },
  inner: { display: 'contents' },
  row: { display: 'flex', width: '100%' },
  cell: {
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
    ...sx.margin(rem(-8)),
  },
  tbodyCellWithTextContent: {
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
  },
  rowHeaderButtonWrap: {
    textAlign: 'left',
    whiteSpace: 'normal',
    height: 'auto',
    paddingBlockStart: rem(4),
    paddingBlockEnd: rem(4),
  },
  tbodyCellAlignEnd: {
    justifyContent: 'flex-end',
  },
  activableRowHeader: {
    color: 'inherit',
    display: 'inline-block',
    minWidth: rem(32),
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    marginInlineStart: rem(-12),
    marginInlineEnd: rem(-12),
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
const accessoryWidth = 40

const colWidthClassName = (colKey: string) => `${colKey}-width`

export const Table = (props: TableProps) => {
  const {
    caption,
    captionVisuallyHidden,
    columns,
    rows,
    rowActions = {},
    rowHeaderColumn,
    rowsActivable,
    maxWidthVariant = 'viewportWidth',
    minWidthVariant = 'fill',
    wrap,
  } = props.table

  const sort = props.contextualSortProps?.setSort
    ? props.contextualSortProps
    : null

  const select = props.contextualSelectionProps?.setSelection
    ? props.contextualSelectionProps
    : null

  const { translations, onAction: contextOnAction } = useFluentBlocksContext()

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

  const updateTableLayout = useCallback(() => {
    const nextColumnsInFlow = getNextColumnsInFlow()
    setInFlowColumns(nextColumnsInFlow!)
    setContentColumnsHidden(
      getContentColumnsHidden(nextColumnsInFlow!, colKeys)
    )
  }, [])

  useLayoutResize($table, updateTableLayout)

  const rootRowHeaderActivate = useCallback(
    ({ target }: MouseEvent<HTMLButtonElement>) => {
      const row = get(target, ['dataset', 'row'])
      if (row) {
        const payload: TableRowActivateAction = {
          type: 'activate',
          actionId: 'activate',
          row: get(target, ['dataset', 'row']),
        }
        props.onAction && props.onAction(payload)
        contextOnAction && contextOnAction(payload)
      }
    },
    [props.onAction, contextOnAction]
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
              action: {
                label: translations['sort--alphabetical-ascending'],
                actionId: `${colKey}:sort--alphabetical-ascending`,
                onAction: () =>
                  sort?.setSort({ sortColumn: colKey, sortOrder: 'ascending' }),
              },
            },
            {
              action: {
                label: translations['sort--alphabetical-descending'],
                actionId: `${colKey}:sort--alphabetical-descending`,
                onAction: () =>
                  sort?.setSort({
                    sortColumn: colKey,
                    sortOrder: 'descending',
                  }),
              },
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
      <style>{`${Array.from(inFlowColumns).reduce(
        (acc: string, colKey: string) => {
          if (colKey === 'selection' || colKey === 'overflow') {
            return `${acc}.${colWidthClassName(colKey)}{flex-basis:${rem(
              accessoryWidth
            )};flex-grow:0;flex-shrink:0;}`
          } else {
            const minWidth = get(columns, [colKey, 'minWidth'], defaultMinWidth)
            return `${acc}.${colWidthClassName(colKey)} {min-width:${rem(
              minWidth
            )};flex-grow:${minWidth};}`
          }
        },
        ''
      )}.row-width{min-width:${rem(
        Array.from(inFlowColumns).reduce((acc: number, colKey: string) => {
          if (colKey === 'selection' || colKey === 'overflow') {
            return acc + accessoryWidth
          } else {
            const minWidth = get(columns, [colKey, 'minWidth'], defaultMinWidth)
            return acc + minWidth
          }
        }, 0)
      )}}`}</style>
      <div role="none" className={tableStyles.rootSpacingAdjust}>
        <div role="none" className={tableStyles.rootInner}>
          <div
            role="grid"
            className={cx(
              tableStyles.grid,
              minWidthVariant === 'fill' && tableStyles['grid--fill'],
              contextualVariant === 'block' && commonStyles.centerBlock
            )}
            tabIndex={0}
            {...groupAttrs}
            aria-labelledby={`desc__${tableId}`}
            aria-colcount={inFlowColumns.size}
            aria-rowcount={rowKeys.length + 1}
          >
            <div {...rootInnerAttrs} className={tableStyles.inner}>
              <div
                role="row"
                tabIndex={0}
                {...groupAttrs}
                className={`${tableStyles.row} row-width`}
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
                                  overflow={getSortOptions(
                                    colKey,
                                    columns[colKey]
                                  )}
                                  triggerIcon={
                                    sort?.sortColumn === colKey
                                      ? sort?.sortOrder === 'ascending'
                                        ? 'arrow_up'
                                        : 'arrow_down'
                                      : 'arrow_sort'
                                  }
                                  contextualRole="button"
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
                    className={`${tableStyles.row} row-width`}
                  >
                    <div {...rowInnerAttrs} className={tableStyles.inner}>
                      {columnOrder.filter(includeColumn).map((colKey, ci) => {
                        const cell = row[colKey]
                        const cellIsActions = isActionsCell(cell)
                        const cellHasButtons =
                          colKey === 'overflow' ||
                          cellIsActions ||
                          (rowsActivable && rowHeaderColumn === colKey)

                        const cellContent =
                          colKey === 'overflow' ? (
                            contentColumnsHidden || row.actions ? (
                              <div
                                className={
                                  tableStyles.tbodyCellWithButtonsContent
                                }
                              >
                                <Overflow
                                  overflow={[
                                    ...(contentColumnsHidden
                                      ? [
                                          {
                                            action: {
                                              label:
                                                translations.viewAllDetails,
                                              actionId: `${rowKey}__details`,
                                            },
                                          },
                                          { divider: {} },
                                        ]
                                      : []),
                                    ...(row.actions
                                      ?.filter((actionId) =>
                                        rowActions.hasOwnProperty(actionId)
                                      )
                                      .map((actionId) => ({
                                        action: {
                                          ...rowActions[actionId],
                                          actionId,
                                          metadata: { rows: [rowKey] },
                                        },
                                      })) || []),
                                  ]}
                                />
                              </div>
                            ) : null
                          ) : colKey === 'selection' ? (
                            <Checkbox
                              checked={!!select?.selection.has(rowKey)}
                              data-row={rowKey}
                              onChange={rootSelectActivate}
                              className={
                                tableStyles.tbodyCellWithButtonsContent
                              }
                            />
                          ) : !cell ? null : cellIsActions ? (
                            <div
                              className={
                                tableStyles.tbodyCellWithButtonsContent
                              }
                            >
                              <ShortInputs
                                inputs={cell
                                  .filter((actionId) =>
                                    rowActions.hasOwnProperty(actionId)
                                  )
                                  .map((actionId) => ({
                                    button: {
                                      ...rowActions[actionId],
                                      actionId,
                                      metadata: { rows: [rowKey] },
                                    },
                                  }))}
                              />
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
                            !(
                              cellHasButtons ||
                              colKey === 'selection' ||
                              wrap
                            ) && tableStyles.tbodyCellWithTextContent,
                            colKey === 'overflow' &&
                              tableStyles.tbodyCellAlignEnd
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
                            ) : rowsActivable ? (
                              <FluentButton
                                className={cx(
                                  tableStyles.activableRowHeader,
                                  tableStyles.tbodyCellWithButtonsContent,
                                  wrap && tableStyles.rowHeaderButtonWrap
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
      </div>
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
