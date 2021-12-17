import { z } from 'zod'
import { ReactElement } from 'react'
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

export const layoutProps = z.object({
  layout: z.object({
    variant: z.union([z.literal('grid'), z.literal('flex')]),
    items: layoutItemSequence,
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '.5rem',
  },
  flex: {
    display: 'flex',
    flexFlow: 'row wrap',
    marginInlineEnd: '-.5rem',
    marginBlockEnd: '-.5rem',
    '& > [role="group"]': {
      flex: '1 0 auto',
      marginInlineEnd: '.5rem',
      marginBlockEnd: '.5rem',
    },
  },
})

export const LayoutItem = (o: LayoutItemEntity) =>
  renderIfCard(o) || renderIfEscape(o) || invalidLayoutItem(o)

export const Layout = ({ layout: { variant, items } }: LayoutProps) => {
  const styles = useLayoutStyles()
  return (
    <section className={cx(styles.root, styles[variant])}>
      {
        <>
          {Sequence<LayoutItemEntity>(items, LayoutItem, {
            contextualVariant: 'layout',
          })}
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
