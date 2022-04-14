import { ButtonProps } from '../inputs'

export type MenuAction = Omit<ButtonProps, 'variant' | 'size' | 'iconSize'>

export type MenuActionSequence = MenuAction[]

export type MenuDivider = {
  type: 'divider'
  variant?: 'line'
}

export type MenuItemEntity = MenuAction | MenuDivider

export type MenuItemSequence = MenuItemEntity[]
