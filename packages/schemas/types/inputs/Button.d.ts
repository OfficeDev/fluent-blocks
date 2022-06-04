import { IconSize, IconVariant } from '../inlines'
import { ActionPayload } from '../lib/actions'
import { InputProps } from './input-properties'

export interface ButtonActionPayload extends ActionPayload {
  type: 'activate'
}

export type ButtonVariant = 'outline' | 'primary' | 'subtle' | 'transparent'
export type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonInnerProps extends Omit<InputProps, 'label'> {
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
  iconOnly?: boolean
  icon?: string
  iconPosition?: 'before' | 'after'
  iconSize?: IconSize
  iconVariant?: IconVariant
  disabled?: boolean
  selected?: boolean
  controls?: string
  metadata?: Record<string, string | string[]>
}

export interface ButtonProps {
  button: ButtonInnerProps
}
