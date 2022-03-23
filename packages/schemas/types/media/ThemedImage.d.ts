import { MediaProps } from './media-properties'
import { ThemeName } from '../lib/themes'

export type ThemedImageProps = MediaProps & {
  [key in ThemeName]: string
}
