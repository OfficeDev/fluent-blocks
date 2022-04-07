import { ButtonProps } from '../inputs'
import { MenuItemSequence } from '../lib/menu'

export interface ToolbarProps {
  toolbar: {
    items: MenuItemSequence
    iconSize?: ButtonProps['iconSize']
    buttonSize?: ButtonProps['size']
  }
}
