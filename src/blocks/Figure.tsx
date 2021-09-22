import { z } from 'zod'
import { inlineSequence } from '../inlines'
import { InlineContent } from './InlineContent'

export const figureProps = z.object({
  caption: inlineSequence,
})

export type FigureProps = z.infer<typeof figureProps>

export function isFigure(o: unknown): o is FigureProps {
  return 'caption' in o
}

/**
 * A block-level element containing media and labeled by a caption.
 */
export const Figure = (props: FigureProps) => {
  const { caption } = figureProps.parse(props)
  return (
    <div className="figure">
      <InlineContent inlines={caption} />
    </div>
  )
}
