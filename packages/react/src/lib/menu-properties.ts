import {
  MenuDivider,
  MenuAction as NaturalMenuAction,
} from '@fluent-blocks/schemas'

import { ButtonProps } from '../inputs'

export interface MenuAction
  extends NaturalMenuAction,
    Omit<
      ButtonProps,
      'type' | 'variant' | 'size' | 'iconSze' | 'contextualVariant'
    > {}

export type MenuActionSequence = MenuAction[]

export type MenuItemEntity = MenuAction | MenuDivider

export type MenuItemSequence = MenuItemEntity[]
