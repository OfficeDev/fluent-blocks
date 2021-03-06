import { InlineSequenceOrString } from '../inlines'
import { AccordionItemProps, AccordionProps } from '../lib/accordion'
import { MenuActionSequence, MenuItemSequence } from '../lib/menu'

export interface SidebarCommonProps {
  title: InlineSequenceOrString
  initialActiveItem?: string
  cornerActions?: MenuActionSequence
  deepCornerActionsMenuVariant?: 'initial' | 'middle'
}

interface SidebarAccordionProps extends Omit<AccordionProps, 'accordion'> {
  accordion: Omit<AccordionItemProps, 'initialActiveItem'>[]
}

export interface AccordionSidebarProps
  extends SidebarCommonProps,
    SidebarAccordionProps {}

export interface FlatSidebarProps extends SidebarCommonProps {
  menu: MenuItemSequence
}

export type SidebarProps = AccordionSidebarProps | FlatSidebarProps
