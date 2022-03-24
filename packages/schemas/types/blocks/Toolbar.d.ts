import { ButtonProps } from '../inputs'

export type ToolbarAction = Omit<ButtonProps, 'variant' | 'size' | 'iconSize'>

export type ToolbarDivider = {
  type: 'divider'
  variant?: 'line'
}

export type ToolbarItemEntity = ToolbarAction | ToolbarDivider

export type ToolbarItemSequence = ToolbarItemEntity[]

export interface ToolbarProps {
  toolbar: {
    items: ToolbarItemSequence
    iconSize?: ButtonProps['iconSize']
    buttonSize?: ButtonProps['size']
  }
}
