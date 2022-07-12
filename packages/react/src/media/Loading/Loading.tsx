import { ReactElement } from 'react'

import { LoadingProps as NaturalLoadingProps } from '@fluent-blocks/schemas'
import { Spinner } from '@fluentui/react-components'

export type LoadingProps = NaturalLoadingProps

export const Loading = ({ loading, label }: LoadingProps) => (
    <Spinner
      size="huge"
      labelPosition="below"
      label={label}
      data-chromatic="ignore"
      aria-live="polite"
    />
  )

export type LoadingElement = ReactElement<LoadingProps, typeof Loading>
export type LoadingPropsOrElement = LoadingProps | LoadingElement

function isLoadingProps(o: any): o is LoadingProps {
  return 'loading' in o
}

function isLoadingElement(o: any): o is LoadingElement {
  return o?.type === Loading
}

export function renderIfLoading(o: any) {
  return isLoadingProps(o) ? <Loading {...o} /> : isLoadingElement(o) ? o : null
}
