import { z } from 'zod'
import { cloneElement, ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import {
  escapeElement,
  invalidLayoutItem,
  invalidLayoutItemSelf,
  propsElementUnion,
  renderIfEscape,
} from '../../lib'

import { cardPropsOrElement, renderIfCard } from '../Card/Card'
import { layoutVariant } from './layout-types'

export const layoutItemEntity = z.union([cardPropsOrElement, escapeElement])
export type LayoutItemEntity = z.infer<typeof layoutItemEntity>

export const layoutItemProps = z
  .object({
    item: layoutItemEntity,
    inlineSizeFactor: z
      .union([z.literal(1), z.literal(2)])
      .default(1)
      .optional(),
    blockSizeFactor: z
      .union([z.literal(1), z.literal(2)])
      .default(1)
      .optional(),
  })
  .merge(
    z
      .object({
        contextualVariant: layoutVariant.default('grid'),
      })
      .partial()
  )
export type LayoutItemProps = z.infer<typeof layoutItemProps>

const useLayoutItemStyles = makeStyles({
  flexInlineSizeFactor1: {
    flex: '1 0 auto',
    marginInlineEnd: '.5rem',
    marginBlockEnd: '.5rem',
  },
  flexInlineSizeFactor2: {
    flex: '2 0 auto',
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

function isLayoutItemProps(o: any): o is LayoutItemProps {
  return 'item' in o
}

function isLayoutItemElement(
  o: any
): o is ReactElement<LayoutItemProps, typeof LayoutItem> {
  return o?.type === LayoutItem
}

export const layoutItemPropsOrElement = propsElementUnion<
  typeof layoutItemProps,
  typeof LayoutItem
>(layoutItemProps)
export type LayoutItemPropsOrElement = z.infer<typeof layoutItemPropsOrElement>

export function renderIfLayoutItem(o: any) {
  return isLayoutItemProps(o) ? (
    <LayoutItem {...o} />
  ) : isLayoutItemElement(o) ? (
    o
  ) : (
    invalidLayoutItemSelf(o)
  )
}
