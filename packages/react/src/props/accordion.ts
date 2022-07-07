import {
  AccordionItemProps as NaturalAccordionItemProps,
  AccordionProps as NaturalAccordionProps,
} from '@fluent-blocks/schemas'

import { InlineSequenceOrString } from '../inlines'
import { MenuItemSequence } from './menus'

export interface AccordionItemProps
  extends Omit<NaturalAccordionItemProps, 'label' | 'menu'> {
  label: InlineSequenceOrString
  menu: MenuItemSequence
}

export interface AccordionProps
  extends Omit<NaturalAccordionProps, 'accordion'> {
  accordion: AccordionItemProps[]
}
