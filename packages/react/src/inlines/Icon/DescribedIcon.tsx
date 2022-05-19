import { ReactElement } from 'react'

import { DescribedIconProps } from '@fluent-blocks/schemas'

import { Described } from '../../lib'
import { Icon } from './Icon'

export const DescribedIcon = ({
  description,
  ...iconProps
}: DescribedIconProps) => {
  const iconElement = <Icon {...iconProps} />
  return Described(
    description ? <span tabIndex={0}>{iconElement}</span> : iconElement,
    description
  )
}

export type DescribedIconElement = ReactElement<
  DescribedIconProps,
  typeof DescribedIcon
>

function isDescribedIconProps(o: any): o is DescribedIconProps {
  return 'description' in o && 'icon' in o
}

function isDescribedIconElement(o: any): o is DescribedIconElement {
  return o?.type === DescribedIcon
}

export function renderIfDescribedIcon(o: any) {
  return isDescribedIconProps(o) ? (
    <DescribedIcon {...o} />
  ) : isDescribedIconElement(o) ? (
    o
  ) : null
}
