import { z } from 'zod'
import { inlineSequence, InlineContent } from '../inlines'
import { ReactElement } from 'react'
import { propsElementUnion } from '../lib'

export const figureProps = z.object({
  caption: inlineSequence,
})
export type FigureProps = z.infer<typeof figureProps>

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

function isFigureProps(p: any): p is FigureProps {
  return 'caption' in p
}

function isFigureElement(
  p: any
): p is ReactElement<FigureProps, typeof Figure> {
  return p?.type === Figure
}

export const figurePropsOrElement = propsElementUnion<
  typeof figureProps,
  FigureProps,
  typeof Figure
>(figureProps)
export type FigurePropsOrElement = z.infer<typeof figurePropsOrElement>

export function renderIfFigure(p: any) {
  return isFigureProps(p) ? <Figure {...p} /> : isFigureElement(p) ? p : null
}
