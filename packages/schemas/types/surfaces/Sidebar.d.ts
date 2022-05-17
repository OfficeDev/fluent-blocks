import { InlineSequenceOrString } from '../inlines'
import { MenuItemSequence } from '../lib/menu'

export interface SidebarProps {
  title: InlineSequenceOrString
  menu: MenuItemSequence
}
