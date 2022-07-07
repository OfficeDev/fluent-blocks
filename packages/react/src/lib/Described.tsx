import { ReactElement } from 'react'

import { Tooltip } from '@fluentui/react-components'

export const Described = (
  element: ReactElement<any, any>,
  description?: string
) =>
  description ? (
    <Tooltip content={description} relationship="description" withArrow>
      {element}
    </Tooltip>
  ) : (
    element
  )
