import { InlineSequenceOrString } from '../inlines'
import { MediaEntity } from '../media'

export interface FigureProps {
  media: MediaEntity
  caption?: InlineSequenceOrString
  captionVisuallyHidden?: boolean
  variant?: 'viewportWidth' | 'textWidth' | 'narrow'
}
