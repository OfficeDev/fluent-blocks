export type TextVariant =
  | 'normal'
  | 'emphasized'
  | 'strong'
  | 'stronger'
  | 'subtle'
  | 'code'

export interface TextProps {
  text: string
  variant?: TextVariant
}

export interface DescribedTextProps extends TextProps {
  description?: string
}
