import { ReactElement } from 'react'

import { AvatarProps as NaturalAvatarProps } from '@fluent-blocks/schemas'
import {
  AvatarNamedColor,
  BadgeProps,
  Avatar as FluentAvatar,
  makeStyles,
} from '@fluentui/react-components'

import { Icon } from '..'
import { key, makeId } from '../../lib'

export interface AvatarProps extends Omit<NaturalAvatarProps, 'avatar'> {
  avatar: Omit<NaturalAvatarProps['avatar'], 'color'> & {
    color?: NaturalAvatarProps['avatar']['color'] | AvatarNamedColor
  }
}

const useAvatarStyles = makeStyles({
  avatar: {
    verticalAlign: 'middle',
    marginBlockStart: '-.2em',
  },
})

export const Avatar = (props: AvatarProps) => {
  const labelId = makeId(key(props), 'label')
  const {
    label,
    avatar: {
      image,
      icon,
      presenceBadge,
      size = 24,
      shape = 'circular',
      color = 'neutral',
      active,
    },
  } = props
  const avatarStyles = useAvatarStyles()

  return (
    <>
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
              status: presenceBadge.status,
              outOfOffice: presenceBadge.outOfOffice,
            } as BadgeProps,
          }),
          className: avatarStyles.avatar,
          'aria-labelledby': labelId,
        }}
      />
      {' '}
      <span id={labelId}>{label}</span>
    </>
  )
}

export type AvatarElement = ReactElement<AvatarProps, typeof Avatar>

function isAvatarProps(o: any): o is AvatarProps {
  return 'avatar' in o
}

function isAvatarElement(o: any): o is AvatarElement {
  return o?.type === Avatar
}

export function renderIfAvatar(o: any) {
  return isAvatarProps(o) ? <Avatar {...o} /> : isAvatarElement(o) ? o : null
}
