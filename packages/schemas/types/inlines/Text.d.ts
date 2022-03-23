export type TextVariant =
  | 'normal'
  | 'emphasized'
  | 'strong'
  | 'highlighted'
  | 'code'

export interface TextProps {
  text: string
  variant: TextVariant
}
