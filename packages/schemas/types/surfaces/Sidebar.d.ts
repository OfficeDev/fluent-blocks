import { InlineSequenceOrString } from '../inlines'
import { AccordionProps } from '../lib/accordion'
import { MenuActionSequence, MenuItemSequence } from '../lib/menu'

export interface SidebarCommonProps {
  title: InlineSequenceOrString
  cornerActions?: MenuActionSequence
  deepCornerActionsMenuVariant?: 'initial' | 'middle'
}

export interface AccordionSidebarProps
  extends SidebarCommonProps,
    AccordionProps {}

export interface FlatSidebarProps extends SidebarCommonProps {
  menu: MenuItemSequence
  defaultActiveItem?: string
}

export type SidebarProps = AccordionSidebarProps | FlatSidebarProps
