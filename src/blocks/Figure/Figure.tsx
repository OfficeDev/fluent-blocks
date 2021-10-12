import { z } from 'zod'
import { inlineSequence, InlineContent } from '../../inlines'
import { ReactElement } from 'react'
import { propsElementUnion } from '../../lib'

export const figureProps = z.object({
  caption: inlineSequence,
})
export type FigureProps = z.infer<typeof figureProps>

/**
 * A block-level element containing media and labeled by a caption.
 */
export const Figure = (props: FigureProps) => {
  const { caption } = props
  return (
    <figure>
      {/* todo: implement media types here */}
      <figcaption>
        <InlineContent inlines={caption} />
      </figcaption>
    </figure>
  )
}

function isFigureProps(o: any): o is FigureProps {
  return 'caption' in o
}

function isFigureElement(
  o: any
): o is ReactElement<FigureProps, typeof Figure> {
  return o?.type === Figure
}

export const figurePropsOrElement = propsElementUnion<
  typeof figureProps,
  FigureProps,
  typeof Figure
>(figureProps)
export type FigurePropsOrElement = z.infer<typeof figurePropsOrElement>

export function renderIfFigure(o: any) {
  return isFigureProps(o) ? <Figure {...o} /> : isFigureElement(o) ? o : null
}
