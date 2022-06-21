import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import { ReactElement, useMemo, useState } from 'react'

import { ListProps as NaturalListProps } from '@fluent-blocks/schemas'
import { makeStyles } from '@fluentui/react-components'

import { getInlineText } from '../../inlines'
import { Button } from '../../inputs'
import { useFluentBlocksContext } from '../../lib'
import {
  CellProps,
  ListColumnProps,
  MenuActionSequence,
  SortProps,
  TableProps,
} from '../../props'
import { Table } from '../Table/Table'
import { Toolbar } from '../Toolbar/Toolbar'

export interface ListProps extends Omit<NaturalListProps, 'list'> {
  list: TableProps['table'] &
    Omit<NaturalListProps['list'], 'columns' | 'listActions'> & {
      columns: Record<string, ListColumnProps>
      listActions?: MenuActionSequence
    }
  contextualVariant?: 'block'
}

const useListStyles = makeStyles({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

interface PaginationProps {
  page: number
  setPage: (page: number) => void
  pageSize: number
  collectionSize: number
}

const Pagination = ({
  page,
  setPage,
  pageSize,
  collectionSize,
}: PaginationProps) => {
  const { translations } = useFluentBlocksContext()
  const listStyles = useListStyles()

  if (collectionSize <= pageSize) {
    return null
  }

  const nPages = Math.ceil(collectionSize / pageSize)

  return (
    <div className={listStyles.pagination}>
      <Button
        button={{
          label: translations['pagination--prev'],
          actionId: 'pagination--prev',
          icon: 'chevron_left',
          variant: 'transparent',
          iconOnly: true,
          disabled: page < 1,
          onAction: () => setPage(page - 1),
        }}
      />
      <span tabIndex={0}>{`${page + 1} / ${nPages}`}</span>
      <Button
        button={{
          label: translations['pagination--next'],
          actionId: 'pagination--next',
          icon: 'chevron_right',
          variant: 'transparent',
          iconOnly: true,
          disabled: page > nPages - 2,
          onAction: () => setPage(page + 1),
        }}
      />
    </div>
  )
}

function alphabeticalSort(a: string, b: string): number {
  return a.localeCompare(b)
}

function getCellText(cell: CellProps | string[] | undefined): string {
  return !cell || isArray(cell) ? '' : getInlineText(cell.cell)
}

export const List = ({ list, contextualVariant = 'block' }: ListProps) => {
  const { pageSize = 16, rows, columns, rowActions } = list
  const rowKeys = Object.keys(rows)
  const colKeys = Object.keys(columns)

  const [sort, setSort] = useState<SortProps | null>(null)
  const [selection, setSelection] = useState<Set<string>>(new Set())
  const [page, setPage] = useState<number>(0)
  const [find, setFind] = useState<string | null>(
    findIndex(colKeys, (colKey) => get(columns, [colKey, 'findable'], false)) >=
      0
      ? ''
      : null
  )

  const commonActions = useMemo(() => {
    if (selection.size) {
      const selectionArr = Array.from(selection)
      const nextCommonActions = new Set(
        get(rows, [selectionArr[0], 'actions'], []).filter((actionId) =>
          get(rowActions, [actionId, 'multiple'], false)
        )
      )
      if (nextCommonActions.size > 0 && selection.size > 1) {
        for (let i = 1; i < selectionArr.length; i += 1) {
          const currentRowActions = new Set(
            get(rows, [selectionArr[i], 'actions'], []).filter((actionId) =>
              get(rowActions, [actionId, 'multiple'], false)
            )
          )
          nextCommonActions.forEach((actionId) => {
            if (!currentRowActions.has(actionId)) {
              nextCommonActions.delete(actionId)
            }
          })
        }
      }
      return nextCommonActions
    } else {
      return new Set()
    }
  }, [selection])

  const findableColumns = colKeys.filter((colKey) => columns[colKey].findable)
  const lowercaseFindQuery = find?.toLowerCase()
  const findMatchedRowKeys =
    find && findableColumns.length
      ? rowKeys.filter(
          (rowKey) =>
            findIndex(findableColumns, (colKey) =>
              getCellText(rows[rowKey][colKey])
                .toLowerCase()
                .includes(lowercaseFindQuery!)
            ) >= 0
        )
      : rowKeys

  // todo: implement other sort types
  const comparator = sort
    ? isFunction(columns[sort.sortColumn].sortVariant)
      ? (columns[sort.sortColumn].sortVariant as (
          a: string,
          b: string
        ) => number)
      : alphabeticalSort
    : alphabeticalSort
  const sortValence = sort?.sortOrder === 'ascending'
  const sortedRowKeys = sort
    ? findMatchedRowKeys.sort((rowKeyA, rowKeyB) =>
        comparator(
          getCellText(rows[sortValence ? rowKeyA : rowKeyB][sort.sortColumn]),
          getCellText(rows[sortValence ? rowKeyB : rowKeyA][sort.sortColumn])
        )
      )
    : findMatchedRowKeys

  const tableRows = sortedRowKeys
    .slice(page * pageSize, (page + 1) * pageSize)
    .reduce((acc: TableProps['table']['rows'], rowKey) => {
      acc[rowKey] = rows[rowKey]
      return acc
    }, {})

  return (
    <>
      {!!(list.listActions?.length || commonActions.size) && (
        <Toolbar
          toolbar={{
            menu: [
              ...(list.listActions || []).map((action) => ({ action })),
              ...Object.keys(rowActions || []).map((actionId) => ({
                action: {
                  ...rowActions![actionId],
                  actionId,
                  metadata: { rows: Array.from(selection) },
                },
                ...(!commonActions.has(actionId) && {
                  hidden: true,
                }),
              })),
            ],
            iconSize: list.iconSize,
            buttonSize: list.buttonSize,
            ...(isString(find) &&
              findableColumns.length && { find: 'list-managed-find' }),
          }}
          contextualVariant={
            list.maxWidthVariant === 'textWidth' ? 'block' : 'viewportWidth'
          }
          contextualFindProps={{
            onAction: ({ value }) => {
              setFind(value)
              if (value) {
                setPage(0)
              }
            },
          }}
        />
      )}
      <Table
        table={{ ...list, rows: tableRows }}
        contextualSortProps={{ setSort, ...sort }}
        {...(list.selectable && {
          contextualSelectionProps: { selection, setSelection },
        })}
      />
      <Pagination
        {...{
          page,
          setPage,
          pageSize,
          collectionSize: sortedRowKeys.length,
        }}
      />
    </>
  )
}

export type ListElement = ReactElement<ListProps, typeof List>
export type ListPropsOrElement = ListProps | ListElement

function isListProps(o: any): o is ListProps {
  return 'list' in o
}

function isListElement(o: any): o is ListElement {
  return o?.type === List
}

export function renderIfList(o: any) {
  return isListProps(o) ? <List {...o} /> : isListElement(o) ? o : null
}
