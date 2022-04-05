import {
  MenuAction as NaturalMenuAction,
  MenuDivider,
} from '@fluent-blocks/schemas'
import { ButtonProps } from '../inputs'

export interface MenuAction
  extends NaturalMenuAction,
    Omit<
      ButtonProps,
      'type' | 'variant' | 'size' | 'iconSze' | 'contextualVariant'
    > {}

export type MenuItemEntity = MenuAction | MenuDivider

export type MenuItemSequence = MenuItemEntity[]
