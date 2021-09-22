import { z } from 'zod'

export const iconId = z.union([
  z.literal('accept'),
  z.literal('add'),
  z.literal('approval'),
  z.literal('apps'),
  z.literal('archive'),
  z.literal('arrow-down'),
  z.literal('arrow-left'),
  z.literal('arrow-right'),
  z.literal('arrow-sort'),
  z.literal('arrow-up'),
  z.literal('audience'),
  // TODO: add the rest of these
])

export type IconId = z.infer<typeof iconId>

export const iconVariant = z.union([z.literal('filled'), z.literal('outline')])

export type IconVariant = z.infer<typeof iconVariant>

export const iconProps = z.object({
  icon: iconId,
  tooltip: z.array(z.string()).optional(),
  variant: iconVariant.optional(),
})

export type IconProps = z.infer<typeof iconProps>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIconProps(p: any): p is IconProps {
  return 'icon' in p
}

export const Icon = (props: IconProps) => {
  const { icon, tooltip, variant } = iconProps.parse(props)
  return <span>🆗︎</span>
}
