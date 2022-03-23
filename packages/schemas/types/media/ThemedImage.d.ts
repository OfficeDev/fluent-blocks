import { MediaProps } from './media-properties'

export interface ThemedImageProps extends MediaProps {
  light: string
  dark: string
  highContrast: string
}
