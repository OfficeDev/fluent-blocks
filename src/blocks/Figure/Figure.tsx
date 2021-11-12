import { z } from 'zod'
import { ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import { inlineSequence, InlineContent } from '../../inlines'
import { mediaEntity, Media } from '../../media'
import { propsElementUnion, rem, useCommonStyles } from '../../lib'

export const figureProps = z.object({
  media: mediaEntity,
  caption: inlineSequence.optional(),
  variation: z
    .union([
      z.literal('viewportWidth'),
      z.literal('textWidth'),
      z.literal('narrow'),
    ])
    .default('viewportWidth')
    .optional(),
})
export type FigureProps = z.infer<typeof figureProps>

const useFigureStyles = makeStyles({
  media: {
    marginInlineStart: 0,
    marginInlineEnd: 0,
  },
  mediaPlaceholder: {
    minHeight: '8rem',
  },
  'media--viewportWidth': {},
  'media--textWidth': {},
  'media--narrow': {
    maxWidth: rem(280),
    marginInlineStart: 'auto',
    marginInlineEnd: 'auto',
  },
})

export const Figure = (props: FigureProps) => {
  const styles = useFigureStyles()
  const commonStyles = useCommonStyles()
  const { caption, variation = 'viewportWidth' } = props
  return (
    <figure>
      <div
        className={cx(
          variation === 'textWidth' && commonStyles.mainContentWidth,
          variation && styles[`media--${variation}`]
        )}
      >
        <Media {...props.media} />
      </div>
      {caption && (
        <figcaption className={commonStyles.mainContentWidth}>
          <InlineContent inlines={caption} />
        </figcaption>
      )}
    </figure>
  )
}

function isFigureProps(o: any): o is FigureProps {
  return 'media' in o
}

function isFigureElement(
  o: any
): o is ReactElement<FigureProps, typeof Figure> {
  return o?.type === Figure
}

export const figurePropsOrElement = propsElementUnion<
  typeof figureProps,
  typeof Figure
>(figureProps)
export type FigurePropsOrElement = z.infer<typeof figurePropsOrElement>

export function renderIfFigure(o: any) {
  return isFigureProps(o) ? <Figure {...o} /> : isFigureElement(o) ? o : null
}
