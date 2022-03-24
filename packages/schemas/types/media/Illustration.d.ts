import { MediaProps } from './media-properties'

export interface IllustrationProps extends MediaProps {
  illustration: 'default' | 'empty' | 'error' | 'hello' | 'thanks'
}
