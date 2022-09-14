import { MediaProps } from '../media'
import { IconProps } from './Icon'

export type AvatarSize =
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 48
  | 56
  | 64
  | 72
  | 96
  | 120
  | 128

export type AvatarShape = 'circular' | 'square'

export type AvatarColor = 'neutral' | 'brand' | 'colorful'

export type Status =
  | 'available'
  | 'busy'
  | 'outOfOffice'
  | 'away'
  | 'doNotDisturb'
  | 'offline'

export interface PresenceBadgeProps extends MediaProps {
  status: Status
  outOfOffice?: boolean
}

export interface AvatarProps extends MediaProps {
  avatar: {
    image?: string
    icon?: IconProps
    active?: 'active' | 'inactive'
    size?: AvatarSize
    shape?: AvatarShape
    color?: AvatarColor
    presenceBadge?: PresenceBadgeProps
  }
  labelVisuallyHidden?: boolean
}
