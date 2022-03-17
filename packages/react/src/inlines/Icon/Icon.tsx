import { z } from 'zod'
import { ReactElement } from 'react'
import { makeStyles } from '@fluentui/react-components'
import { iconVariant, iconSize, iconProps } from '@fluent-blocks/schemas'

import { zodElement } from '../../lib'

export type IconVariant = z.infer<typeof iconVariant>
export type IconSize = z.infer<typeof iconSize>
export type IconProps = z.infer<typeof iconProps>

function spriteHref(
  icon: string,
  size: IconSize,
  variant: IconVariant
): string {
  const assetId = `${icon}_${size}_${
    variant === 'outline' ? 'regular' : variant
  }`
  return `/sprites/${assetId}.sprite.svg#${assetId}`
}

const iconToTextRatio = 1.16

const useIconStyles = makeStyles({
  root: {
    height: `${iconToTextRatio}em`,
    width: `${iconToTextRatio}em`,
    verticalAlign: 'text-bottom',
    fill: 'currentcolor',
  },
})

export const Icon = (props: IconProps) => {
  const { icon, variant, size } = props
  const iconStyles = useIconStyles()
  return (
    <svg className={iconStyles.root} data-chromatic="ignore">
      <use href={spriteHref(icon, size!, variant!)} />
    </svg>
  )
}

function isIconProps(o: any): o is IconProps {
  return 'icon' in o
}

function isIconElement(o: any): o is ReactElement<IconProps, typeof Icon> {
  return o?.type === Icon
}

export const iconElement = zodElement<typeof iconProps, typeof Icon>(iconProps)
export type IconElement = z.infer<typeof iconElement>

export function renderIfIcon(o: any) {
  return isIconProps(o) ? <Icon {...o} /> : isIconElement(o) ? o : null
}
