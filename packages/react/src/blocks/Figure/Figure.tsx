import uniqueId from 'lodash/uniqueId'
import { ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import { FigureProps as NaturalFigureProps } from '@fluent-blocks/schemas'

import { InlineSequenceOrString, InlineContent } from '../../inlines'
import { MediaEntity, Media } from '../../media'
import { useCommonStyles } from '../../lib'

export interface FigureProps
  extends Omit<NaturalFigureProps, 'media' | 'caption'> {
  media: MediaEntity
  caption?: InlineSequenceOrString
}

const useFigureStyles = makeStyles({
  root: {
    marginInlineStart: 0,
    marginInlineEnd: 0,
  },
})

export const Figure = (props: FigureProps) => {
  const figureStyles = useFigureStyles()
  const commonStyles = useCommonStyles()
  const { caption, captionVisuallyHidden, variant = 'viewportWidth' } = props
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
            captionVisuallyHidden && commonStyles.visuallyHidden
          )}
        >
          <InlineContent inlines={caption} />
        </figcaption>
      )}
    </figure>
  )
}

export type FigureElement = ReactElement<FigureProps, typeof Figure>
export type FigurePropsOrElement = FigureProps | FigureElement

function isFigureProps(o: any): o is FigureProps {
  return 'media' in o
}

function isFigureElement(o: any): o is FigureElement {
  return o?.type === Figure
}

export function renderIfFigure(o: any) {
  return isFigureProps(o) ? <Figure {...o} /> : isFigureElement(o) ? o : null
}
