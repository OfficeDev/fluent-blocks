import { z } from 'zod'
import { MediaEntity } from '../media'
import { InlineSequenceOrString } from '../inlines'

export interface FigureProps {
  media: MediaEntity
  caption?: InlineSequenceOrString
  captionHidden?: boolean
  variant: 'viewportWidth' | 'textWidth' | 'narrow'
}
