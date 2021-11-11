import { z } from 'zod'
import { ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import { inlineSequence, InlineContent } from '../../inlines'
import { Placeholder, propsElementUnion, useCommonStyles } from '../../lib'

export const figureProps = z.object({
  caption: inlineSequence,
  flexItem: z.boolean().optional(),
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
})

export const Figure = (props: FigureProps) => {
  const styles = useFigureStyles()
  const commonStyles = useCommonStyles()
  const { caption, flexItem } = props
  return (
    <figure>
      <Placeholder
        label="Figure media"
        className={cx(styles.media, styles.mediaPlaceholder)}
      />
      <figcaption
        className={cx(
          commonStyles.mainContentWidth,
          !flexItem && commonStyles.centerBlock
        )}
      >
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
