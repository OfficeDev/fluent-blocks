import {
  ListProps as NaturalListProps,
  SortVariant as NaturalSortVariant,
} from '@fluent-blocks/schemas'
import { TableColumnProps, TableProps } from '../Table/table-properties'
import { Table } from '../Table/Table'
import { ReactElement } from 'react'

export type SortPredicate = (a: any, b: any) => number

export interface ListColumnProps extends TableColumnProps {
  sortVariant?: NaturalSortVariant | SortPredicate
}

export interface ListProps extends Omit<NaturalListProps, 'list'> {
  list: Omit<TableProps['table'], 'columns'> & {
    columns: Record<string, ListColumnProps>
  }
  contextualVariant?: 'block'
}

export const List = ({ list, contextualVariant }: ListProps) =>
  // todo: this is not yet correct; only pass table a subset of the rows based on the page size, current page, sort, and filter
   <Table table={list} />


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
