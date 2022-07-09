export type TextVariant = 'normal' | 'emphasized' | 'strong' | 'subtle' | 'code'

export interface TextProps {
  text: string
  variant?: TextVariant
}

export interface DescribedTextProps extends TextProps {
  description?: string
}
