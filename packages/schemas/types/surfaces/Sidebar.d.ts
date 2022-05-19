import { InlineSequenceOrString } from '../inlines'
import { MenuItemSequence } from '../lib/menu'

export interface SidebarItemProps {
  actionId: string
  label: InlineSequenceOrString
  menu: MenuItemSequence
}

export interface SidebarProps {
  title: InlineSequenceOrString
  items: SidebarItemProps[]
  defaultOpenItems?: string[]
}