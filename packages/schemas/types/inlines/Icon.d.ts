export type IconVariant = 'filled' | 'outline'

export type IconSize =
  | 10
  | 12
  | 16
  | 20
  | 24
  | 28
  | 32
  | 48
  | '10'
  | '12'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | '48'

export interface IconProps {
  icon: string
  variant?: IconVariant
  size?: IconSize
}

export interface DescribedIconProps extends IconProps {
  description?: string
}
