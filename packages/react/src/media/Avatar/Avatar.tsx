import {
  Avatar as FluentAvatar,
  AvatarNamedColor,
} from '@fluentui/react-components'
import { AvatarProps as NaturalAvatarProps } from '@fluent-blocks/schemas'
import { Icon } from '../../inlines'

export interface AvatarProps extends Omit<NaturalAvatarProps, 'avatar'> {
  avatar: Omit<NaturalAvatarProps['avatar'], 'color'> & {
    color?: NaturalAvatarProps['avatar']['color'] | AvatarNamedColor
  }
}

export const Avatar = ({
  label,
  avatar: {
    image,
    icon,
    presenceBadge,
    size = 32,
    shape = 'circular',
    color = 'neutral',
    active,
  },
}: AvatarProps) => (
    <FluentAvatar
      {...{
        name: label,
        size,
        shape,
        color,
        active,
        ...(image && { image: { src: image } }),
        ...(icon && <Icon {...icon} />),
        ...(presenceBadge && {
          badge: {
            'aria-label': presenceBadge.label,
            status: presenceBadge.status,
            outOfOffice: presenceBadge.outOfOffice,
          },
        }),
      }}
    />
  )
