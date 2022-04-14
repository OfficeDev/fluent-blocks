import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import { ReactElement, useState } from 'react'

import { ListProps as NaturalListProps } from '@fluent-blocks/schemas'
import { makeStyles } from '@fluentui/react-components'

import { getInlineText } from '../../inlines'
import { Button } from '../../inputs'
import {
  CellProps,
  ListColumnProps,
  MenuActionSequence,
  SortProps,
  TableAction,
  TableProps,
  useFluentBlocksContext,
} from '../../lib'
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
        {...{
          type: 'action',
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
        {...{
          type: 'action',
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

function getCellText(cell: CellProps | TableAction[] | undefined): string {
  return !cell || isArray(cell) ? '' : getInlineText(cell.cell)
}

export const List = ({ list, contextualVariant = 'block' }: ListProps) => {
  const [sort, setSort] = useState<SortProps | null>(null)
  const [filter, setFilter] = useState<string | null>(null)
  const [selection, setSelection] = useState<Set<string>>(new Set())
  const [page, setPage] = useState<number>(0)
  const { pageSize = 16, rows, columns } = list
  const rowKeys = Object.keys(rows)

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
    ? rowKeys.sort((rowKeyA, rowKeyB) =>
        comparator(
          getCellText(rows[sortValence ? rowKeyA : rowKeyB][sort.sortColumn]),
          getCellText(rows[sortValence ? rowKeyB : rowKeyA][sort.sortColumn])
        )
      )
    : rowKeys

  const tableRows = sortedRowKeys
    .slice(page * pageSize, (page + 1) * pageSize)
    .reduce((acc: TableProps['table']['rows'], rowKey) => {
      acc[rowKey] = rows[rowKey]
      return acc
    }, {})

  return (
    <>
      {list.listActions && (
        <Toolbar
          toolbar={{
            items: list.listActions,
            iconSize: list.iconSize,
            buttonSize: list.buttonSize,
          }}
          contextualVariant={
            list.maxWidthVariant === 'textWidth' ? 'block' : 'viewportWidth'
          }
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
          collectionSize: rowKeys.length,
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
