import get from 'lodash/get'
import { ReactElement } from 'react'

import basicIcons from '@fluent-blocks/basic-icons'
import { IconProps, IconSize, IconVariant } from '@fluent-blocks/schemas'
import { makeStyles } from '@fluentui/react-components'

import { useFluentBlocksContext } from '../../lib'

function spriteHref(
  icon: string,
  size: IconSize,
  variant: IconVariant,
  iconSpriteUrl: string
): string {
  const style = variant === 'outline' ? 'regular' : variant
  const assetId = `${icon}_${size}_${style}`
  const basicIconConfig = get(basicIcons, ['include', icon], null)
  if (
    basicIconConfig &&
    get(basicIconConfig, 'sizes', get(basicIcons, 'sizes', [])).includes(
      size
    ) &&
    get(basicIconConfig, 'styles', get(basicIcons, 'styles', [])).includes(
      style
    )
  ) {
    // use basic sprite
    return `${iconSpriteUrl}#${assetId}`
  } else {
    // fallback
    return `/sprites/${assetId}.sprite.svg#${assetId}`
  }
}

const iconToTextRatio = 1.25

const useIconStyles = makeStyles({
  root: {
    height: `${iconToTextRatio}em`,
    width: `${iconToTextRatio}em`,
    verticalAlign: 'text-bottom',
    fill: 'currentcolor',
  },
})

export const Icon = (props: IconProps) => {
  const { icon, variant = 'outline', size = 16 } = props
  const iconStyles = useIconStyles()
  const { iconSpriteUrl } = useFluentBlocksContext()
  return (
    <svg className={`${iconStyles.root} fuib-Icon`} data-chromatic="ignore">
      <use href={spriteHref(icon, size, variant, iconSpriteUrl)} />
    </svg>
  )
}

export type IconElement = ReactElement<IconProps, typeof Icon>

function isIconProps(o: any): o is IconProps {
  return 'icon' in o
}

function isIconElement(o: any): o is IconElement {
  return o?.type === Icon
}

export function renderIfIcon(o: any) {
  return isIconProps(o) ? <Icon {...o} /> : isIconElement(o) ? o : null
}
