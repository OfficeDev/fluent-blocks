import { InlineSequenceOrString } from '../inlines'
import { MenuItemSequence } from './menu'

export interface AccordionItemProps {
  actionId: string
  label: InlineSequenceOrString
  menu: MenuItemSequence
  initialActiveItem?: string
}

export interface AccordionProps {
  accordion: AccordionItemProps[]
  defaultOpenItems?: string[]
}
