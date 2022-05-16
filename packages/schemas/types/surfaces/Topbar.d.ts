import { MenuItemSequence } from '../lib/menu'

interface TopbarFarProps {
  menu?: MenuItemSequence
}

interface TopbarNearProps {
  menu?: MenuItemSequence
}

export interface TopbarProps {
  near?: TopbarNearProps
  far?: TopbarFarProps
}
