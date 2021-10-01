import { z } from 'zod'
import { cloneElement, ReactElement } from 'react'
import { makeStyles } from '@fluentui/react-components'
import { key, propsElementUnion } from '../lib'

export const iconVariant = z.union([z.literal('filled'), z.literal('outline')])
export type IconVariant = z.infer<typeof iconVariant>

export const iconSize = z.union([
  z.literal(12),
  z.literal(16),
  z.literal(20),
  z.literal(24),
  z.literal(28),
  z.literal(32),
  z.literal(48),
])
export type IconSize = z.infer<typeof iconSize>

export const iconProps = z.object({
  icon: z.string(),
  variant: iconVariant.default('outline').optional(),
  size: iconSize.default(20).optional(),
})

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

const useStyles = makeStyles({
  root: {
    height: '1.1em',
    width: '1.1em',
    verticalAlign: 'baseline',
    marginBottom: '-0.1em',
  },
})

export const Icon = (props: IconProps) => {
  const { icon, variant = 'outline', size = 20 } = iconProps.parse(props)
  const styles = useStyles()
  return (
    <svg className={styles.root}>
      <use href={spriteHref(icon, size, variant)} />
    </svg>
  )
}

export function isIconProps(p: any): p is IconProps {
  return 'icon' in p
}

export function isIconElement(
  p: any
): p is ReactElement<IconProps, typeof Icon> {
  return p?.type === Icon
}

export const iconPropsOrElement = propsElementUnion<
  typeof iconProps,
  IconProps,
  typeof Icon
>(iconProps)
export type IconPropsOrElement = z.infer<typeof iconPropsOrElement>

export function renderIfIcon(p: any) {
  return isIconProps(p) ? (
    <Icon {...p} key={key(p)} />
  ) : isIconElement(p) ? (
    cloneElement(p, { key: key(p.props) })
  ) : null
}
