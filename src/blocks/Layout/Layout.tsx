import { z } from 'zod'
import { ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import { propsElementUnion, Sequence } from '../../lib'

import {
  LayoutItemPropsOrElement,
  layoutItemPropsOrElement,
  renderIfLayoutItem,
} from './LayoutItem'

import { layoutVariant } from './layout-types'

export const layoutProps = z.object({
  layout: z.object({
    variant: layoutVariant,
    items: z.array(layoutItemPropsOrElement),
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
})

export const Layout = ({ layout: { variant, items } }: LayoutProps) => {
  const styles = useLayoutStyles()

  return (
    <section className={cx(styles.root, styles[variant])}>
      {
        <>
          {Sequence<LayoutItemPropsOrElement>(items, renderIfLayoutItem, {
            contextualVariant: variant,
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
