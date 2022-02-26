import { z } from 'zod'
import { ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import { LayoutItemPropsOrElement, renderIfLayoutItem } from './LayoutItem'
import { propsElementUnion, Sequence, sx } from '../../lib'

import { layoutProps, LayoutProps } from './layout-properties'

import {
  dashboardPropsOrElement,
  renderIfDashboard,
} from './exemplars/Dashboard/Dashboard'

const useLayoutStyles = makeStyles({
  root: {
    marginBlockStart: '1rem',
    marginBlockEnd: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    ...sx.gap('.5rem'),
    '@media screen and (min-width: 600px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    },
  },
  flex: {
    display: 'flex',
    ...sx.flexFlow('row', 'wrap'),
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

export const layoutPropsOrElementExact = propsElementUnion<
  typeof layoutProps,
  typeof Layout
>(layoutProps)
export type LayoutPropsOrElementExact = z.infer<
  typeof layoutPropsOrElementExact
>

export function renderIfLayoutExact(o: any) {
  return isLayoutProps(o) ? <Layout {...o} /> : isLayoutElement(o) ? o : null
}

export const layoutPropsOrElement = z.union([
  layoutPropsOrElementExact,
  dashboardPropsOrElement,
])
export type LayoutPropsOrElement = z.infer<typeof layoutPropsOrElement>

export function renderIfLayout(o: any) {
  return renderIfLayoutExact(o) || renderIfDashboard(o)
}
