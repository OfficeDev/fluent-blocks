import { ButtonProps } from '../inputs'

export type MenuAction = {
  action: Omit<ButtonProps['button'], 'size' | 'iconSize'> & {}
  hidden?: boolean
}

export type MenuActionSequence = MenuAction['action'][]

export type MenuDivider = {
  divider: {
    variant?: 'line'
  }
  hidden?: boolean
}

export type MenuItemEntity = MenuAction | MenuDivider

export type MenuItemSequence = MenuItemEntity[]
