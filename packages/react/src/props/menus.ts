import {
  MenuDivider,
  MenuAction as NaturalMenuAction,
} from '@fluent-blocks/schemas'

import { ButtonProps } from '../inputs'

export interface MenuAction extends Omit<NaturalMenuAction, 'action'> {
  action: NaturalMenuAction['action'] &
    Omit<ButtonProps['button'], 'type' | 'size' | 'iconSze'>
}

export type MenuActionSequence = MenuAction['action'][]

export type MenuItemEntity = MenuAction | MenuDivider

export type MenuItemSequence = MenuItemEntity[]
