import { z } from 'zod'
import { inlineSequence, InlineContent } from '../inlines'

export const figureProps = z.object({
  caption: inlineSequence,
})

export type FigureProps = z.infer<typeof figureProps>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFigure(o: any): o is FigureProps {
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
