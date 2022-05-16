import { FilterProps } from '../blocks'
import { MenuItemSequence } from '../lib/menu'

interface TopbarFarProps {
  menu?: MenuItemSequence
  filter?: FilterProps
  /**
   * An actionId
   */
  find?: string
}

interface TopbarNearProps {
  menu?: MenuItemSequence
}

export interface TopbarProps {
  near?: TopbarNearProps
  far?: TopbarFarProps
}
