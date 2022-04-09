import { ListProps as NaturalListProps } from '@fluent-blocks/schemas'
import {
  SortProps,
  ListColumnProps,
  TableProps,
} from '../Table/table-properties'
import { Table } from '../Table/Table'
import { ReactElement, useState } from 'react'

export interface ListProps extends Omit<NaturalListProps, 'list'> {
  list: Omit<TableProps['table'], 'columns'> & {
    columns: Record<string, ListColumnProps>
    pageSize?: number
  }
  contextualVariant?: 'block'
}

export const List = ({ list, contextualVariant = 'block' }: ListProps) => {
  const [sort, setSort] = useState<SortProps | null>(null)
  const [filter, setFilter] = useState<string | null>(null)
  const [page, setPage] = useState<number>(0)
  const { pageSize = 16, rows } = list

  const tableRows = Object.keys(rows)
    .slice(page * pageSize, (page + 1) * pageSize)
    .reduce((acc: TableProps['table']['rows'], rowKey) => {
      acc[rowKey] = rows[rowKey]
      return acc
    }, {})

  return (
    <Table
      table={{ ...list, rows: tableRows }}
      contextualSortProps={{ setSort, ...sort }}
    />
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
