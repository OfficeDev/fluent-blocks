import { z } from 'zod'
import { ReactElement } from 'react'
import { makeStyles } from '@fluentui/react-components'

import { propsElementUnion } from '../../lib'

export const iconVariant = z.union([z.literal('filled'), z.literal('outline')])
export type IconVariant = z.infer<typeof iconVariant>

export const iconSize = z.union([
  z.literal(10),
  z.literal(12),
  z.literal(16),
  z.literal(20),
  z.literal(24),
  z.literal(28),
  z.literal(32),
  z.literal(48),
  z.literal('10'),
  z.literal('12'),
  z.literal('16'),
  z.literal('20'),
  z.literal('24'),
  z.literal('28'),
  z.literal('32'),
  z.literal('48'),
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

const iconToTextRatio = 1.16

const useStyles = makeStyles({
  root: {
    height: `${iconToTextRatio}em`,
    width: `${iconToTextRatio}em`,
    verticalAlign: 'text-bottom',
  },
})

export const Icon = (props: IconProps) => {
  const { icon, variant, size } = props
  const styles = useStyles()
  return (
    <svg className={styles.root}>
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

export const iconPropsOrElement = propsElementUnion<
  typeof iconProps,
  typeof Icon
>(iconProps)
export type IconPropsOrElement = z.infer<typeof iconPropsOrElement>

export function renderIfIcon(o: any) {
  return isIconProps(o) ? <Icon {...o} /> : isIconElement(o) ? o : null
}
