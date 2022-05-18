import { ReactElement } from 'react'

import { Tooltip } from '@fluentui/react-components'

export interface DescribedProps {
  description?: string
  element: ReactElement<any, any>
}

export const Described = ({ description, element }: DescribedProps) =>
  description ? (
    <Tooltip content={description} relationship="description" withArrow>
      {element}
    </Tooltip>
  ) : (
    element
  )
