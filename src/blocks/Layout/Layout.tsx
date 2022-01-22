import { z } from 'zod'
import { ReactElement } from 'react'
import get from 'lodash/get'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import {
  escapeElement,
  invalidLayoutItem,
  propsElementUnion,
  renderIfEscape,
  Sequence,
} from '../../lib'
import { cardPropsOrElement, renderIfCard } from '../Card/Card'

export const layoutItemEntity = z.union([cardPropsOrElement, escapeElement])
export type LayoutItemEntity = z.infer<typeof layoutItemEntity>

export const layoutItemSequence = z.array(layoutItemEntity)

export const layoutItemOptionProps = z.union([
  z.object({
    inlineSizeFactor: z.number().int().gte(1).lte(2).default(1).optional(),
  }),
  z.undefined(),
])
export type LayoutItemOptionProps = z.infer<typeof layoutItemOptionProps>

export const layoutVariant = z.union([z.literal('grid'), z.literal('flex')])
export type LayoutVariant = z.infer<typeof layoutVariant>

export const layoutProps = z.object({
  layout: z.object({
    variant: layoutVariant,
    items: layoutItemSequence,
    itemOptions: z.array(layoutItemOptionProps).optional(),
  }),
})
export type LayoutProps = z.infer<typeof layoutProps>

const useLayoutStyles = makeStyles({
  root: {
    marginBlockStart: '1rem',
    marginBlockEnd: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '.5rem',
    '@media screen and (min-width: 600px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    },
  },
  flex: {
    display: 'flex',
    flexFlow: 'row wrap',
    marginInlineEnd: '-.5rem',
    marginBlockEnd: '-.5rem',
  },
  flexItemSizeFactor1: {
    flex: '1 0 auto',
    marginInlineEnd: '.5rem',
    marginBlockEnd: '.5rem',
  },
  flexItemSizeFactor2: {
    flex: '2 0 auto',
    marginInlineEnd: '.5rem',
    marginBlockEnd: '.5rem',
  },
  gridItemSizeFactor1: {},
  gridItemSizeFactor2: {
    '@media screen and (min-width: 600px)': {
      gridColumnEnd: 'span 2',
    },
  },
})

export const LayoutItem = (o: LayoutItemEntity) =>
  renderIfCard(o) || renderIfEscape(o) || invalidLayoutItem(o)

export const Layout = ({
  layout: { variant, items, itemOptions },
}: LayoutProps) => {
  const styles = useLayoutStyles()

  const sequenceItemProps = items.map((_, i) => ({
    contextualClassName:
      styles[
        `${variant}ItemSizeFactor${
          get(itemOptions, [i, 'inlineSizeFactor'], 1) as '1' | '2'
        }`
      ],
  }))

  return (
    <section className={cx(styles.root, styles[variant])}>
      {
        <>
          {Sequence<LayoutItemEntity>(
            items,
            LayoutItem,
            {
              contextualVariant: 'layout',
            },
            sequenceItemProps
          )}
        </>
      }
    </section>
  )
}

function isLayoutProps(o: any): o is LayoutProps {
  return 'layout' in o
}

function isLayoutElement(
  o: any
): o is ReactElement<LayoutProps, typeof Layout> {
  return o?.type === Layout
}

export const layoutPropsOrElement = propsElementUnion<
  typeof layoutProps,
  typeof Layout
>(layoutProps)
export type LayoutPropsOrElement = z.infer<typeof layoutPropsOrElement>

export function renderIfLayout(o: any) {
  return isLayoutProps(o) ? <Layout {...o} /> : isLayoutElement(o) ? o : null
}
