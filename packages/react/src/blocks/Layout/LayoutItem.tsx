import { cloneElement, ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import {
  LayoutVariant,
  LayoutItemProps as NaturalLayoutItemProps,
} from '@fluent-blocks/schemas'

import {
  EscapeElement,
  invalidLayoutItem,
  invalidLayoutItemSelf,
  renderIfEscape,
  sx,
} from '../../lib'

import { CardPropsOrElement, renderIfCard } from '../Card/Card'

export type LayoutItemEntity = CardPropsOrElement | EscapeElement

export interface LayoutItemProps extends Omit<NaturalLayoutItemProps, 'item'> {
  item: LayoutItemEntity
  contextualVariant?: LayoutVariant
}

const useLayoutItemStyles = makeStyles({
  flexInlineSizeFactor1: {
    ...sx.flex(1, 0, 'auto'),
    marginInlineEnd: '.5rem',
    marginBlockEnd: '.5rem',
  },
  flexInlineSizeFactor2: {
    ...sx.flex(2, 0, 'auto'),
    marginInlineEnd: '.5rem',
    marginBlockEnd: '.5rem',
  },
  flexBlockSizeFactor1: {},
  flexBlockSizeFactor2: {},
  gridInlineSizeFactor1: {},
  gridInlineSizeFactor2: {
    '@media screen and (min-width: 600px)': {
      gridColumnEnd: 'span 2',
    },
  },
  gridBlockSizeFactor1: {},
  gridBlockSizeFactor2: {
    gridRowEnd: 'span 2',
  },
})

export const LayoutItem = ({
  item,
  contextualVariant = 'grid',
  inlineSizeFactor = 1,
  blockSizeFactor = 1,
}: LayoutItemProps) => {
  const styles = useLayoutItemStyles()

  const contentElement =
    renderIfCard(item) || renderIfEscape(item) || invalidLayoutItem(item)

  return (
    contentElement && (
      <div
        className={cx(
          styles[
            `${contextualVariant}InlineSizeFactor${
              inlineSizeFactor.toString() as '1' | '2'
            }`
          ],
          styles[
            `${contextualVariant}BlockSizeFactor${
              blockSizeFactor.toString() as '1' | '2'
            }`
          ]
        )}
      >
        {cloneElement(contentElement, { contextualVariant: 'layout' })}
      </div>
    )
  )
}

export type LayoutItemElement = ReactElement<LayoutItemProps, typeof LayoutItem>
export type LayoutItemPropsOrElement = LayoutItemProps | LayoutItemElement

function isLayoutItemProps(o: any): o is LayoutItemProps {
  return 'item' in o
}

function isLayoutItemElement(o: any): o is LayoutItemElement {
  return o?.type === LayoutItem
}

export function renderIfLayoutItem(o: any) {
  return isLayoutItemProps(o) ? (
    <LayoutItem {...o} />
  ) : isLayoutItemElement(o) ? (
    o
  ) : (
    invalidLayoutItemSelf(o)
  )
}
