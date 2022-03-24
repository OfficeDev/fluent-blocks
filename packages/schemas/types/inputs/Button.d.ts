import { ActionPayload } from '../lib/actions'
import { IconSize, IconVariant } from '../inlines'
import { InputProps } from './input-properties'

export interface ButtonActionPayload extends ActionPayload {
  type: 'activate'
}

export type ButtonVariant = 'outline' | 'primary' | 'subtle' | 'transparent'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps extends Omit<InputProps, 'label'> {
  type: 'action'
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
  iconOnly?: boolean
  icon?: string
  iconPosition?: 'before' | 'after'
  iconSize?: IconSize
  iconVariant?: IconVariant
}
