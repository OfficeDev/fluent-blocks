import { ButtonProps } from '../inputs'

export type MenuAction = Omit<ButtonProps, 'variant' | 'size' | 'iconSize'> & {
  hidden?: boolean
}

export type MenuActionSequence = MenuAction[]

export type MenuDivider = {
  type: 'divider'
  hidden?: boolean
  variant?: 'line'
}

export type MenuItemEntity = MenuAction | MenuDivider

export type MenuItemSequence = MenuItemEntity[]
