import { InlineSequenceOrString } from '../inlines'
import { MenuActionSequence, MenuItemSequence } from '../lib/menu'

export interface SidebarItemProps {
  actionId: string
  label: InlineSequenceOrString
  menu: MenuItemSequence
}

export interface SidebarProps {
  cornerActions?: MenuActionSequence
  title: InlineSequenceOrString
  items: SidebarItemProps[]
  defaultOpenItems?: string[]
}
