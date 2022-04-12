import { ListProps as NaturalListProps } from '@fluent-blocks/schemas'
import {
  SortProps,
  ListColumnProps,
  TableProps,
} from '../Table/table-properties'
import { Table } from '../Table/Table'
import { ReactElement, SetStateAction, Dispatch, useState } from 'react'
import { Button } from '../../inputs'
import { useFluentBlocksContext } from '../../lib'
import { makeStyles } from '@fluentui/react-components'

export interface ListProps extends Omit<NaturalListProps, 'list'> {
  list: Omit<TableProps['table'], 'columns'> & {
    columns: Record<string, ListColumnProps>
    pageSize?: number
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
  setPage: Dispatch<SetStateAction<number>>
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
          onAction: () => {
            setPage(page - 1)
          },
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
          onAction: () => {
            setPage(page + 1)
          },
        }}
      />
    </div>
  )
}

export const List = ({ list, contextualVariant = 'block' }: ListProps) => {
  const [sort, setSort] = useState<SortProps | null>(null)
  const [filter, setFilter] = useState<string | null>(null)
  const [page, setPage] = useState<number>(0)
  const { pageSize = 16, rows } = list
  const rowKeys = Object.keys(rows)

  const tableRows = rowKeys
    .slice(page * pageSize, (page + 1) * pageSize)
    .reduce((acc: TableProps['table']['rows'], rowKey) => {
      acc[rowKey] = rows[rowKey]
      return acc
    }, {})

  return (
    <>
      <Table
        table={{ ...list, rows: tableRows }}
        contextualSortProps={{ setSort, ...sort }}
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
