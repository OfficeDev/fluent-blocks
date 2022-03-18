import { z } from 'zod'
import uniqueId from 'lodash/uniqueId'
import { ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import { figureProps as naturalFigureProps } from '@fluent-blocks/schemas'

import { inlineSequenceOrString, InlineContent } from '../../inlines'
import { mediaEntity, Media } from '../../media'
import { propsElementUnion, useCommonStyles } from '../../lib'

export const figureProps = naturalFigureProps.merge(
  z.object({
    media: mediaEntity,
    caption: inlineSequenceOrString.optional(),
  })
)
export type FigureProps = z.infer<typeof figureProps>

const useFigureStyles = makeStyles({
  root: {
    marginInlineStart: 0,
    marginInlineEnd: 0,
  },
})

export const Figure = (props: FigureProps) => {
  const figureStyles = useFigureStyles()
  const commonStyles = useCommonStyles()
  const { caption, captionHidden, variant = 'viewportWidth' } = props
  const labelId = caption && uniqueId('figcaption')
  return (
    <figure
      className={cx(figureStyles.root)}
      {...(caption && { 'aria-labelledby': labelId })}
    >
      <div
        className={cx(
          commonStyles.centerBlock,
          variant === 'textWidth' && commonStyles.mainContentWidth,
          variant === 'narrow' && commonStyles.narrowWidth
        )}
      >
        {Media(props.media)}
      </div>
      {caption && (
        <figcaption
          id={labelId}
          className={cx(
            commonStyles.centerBlock,
            commonStyles.mainContentWidth,
            captionHidden && commonStyles.visuallyHidden
          )}
        >
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
