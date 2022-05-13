import { ReactElement, useRef, useState } from 'react'

import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'

import { Sequence, sx } from '../../lib'
import { useLayoutResize } from '../../lib/useLayoutResize'
import { LayoutProps } from '../../props'
import { LayoutItemPropsOrElement, renderIfLayoutItem } from './LayoutItem'
import {
  DashboardPropsOrElement,
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
  },
  'grid--broad': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  },
  flex: {
    display: 'flex',
    ...sx.flexFlow('row', 'wrap'),
    marginInlineEnd: '-.5rem',
    marginBlockEnd: '-.5rem',
  },
  'flex--broad': {},
})

export const Layout = ({ layout: { variant, items } }: LayoutProps) => {
  const styles = useLayoutStyles()
  const $layout = useRef<HTMLElement | null>(null)
  const [isBroad, setIsBroad] = useState(false)

  useLayoutResize($layout, () =>
    setIsBroad(!!$layout.current && $layout.current.clientWidth >= 512)
  )

  return (
    <section
      ref={$layout}
      className={cx(
        styles.root,
        styles[variant],
        isBroad && styles[`${variant}--broad`]
      )}
    >
      {
        <>
          {Sequence<LayoutItemPropsOrElement>(items, renderIfLayoutItem, {
            contextualVariant: variant,
            contextualIsBroad: isBroad,
          })}
        </>
      }
    </section>
  )
}

export type LayoutElement = ReactElement<LayoutProps, typeof Layout>
export type LayoutPropsOrElementExact = LayoutProps | LayoutElement
export type LayoutPropsOrElement =
  | LayoutPropsOrElementExact
  | DashboardPropsOrElement

function isLayoutProps(o: any): o is LayoutProps {
  return 'layout' in o
}

function isLayoutElement(o: any): o is LayoutElement {
  return o?.type === Layout
}

export function renderIfLayoutExact(o: any) {
  return isLayoutProps(o) ? <Layout {...o} /> : isLayoutElement(o) ? o : null
}

export function renderIfLayout(o: any) {
  return renderIfLayoutExact(o) || renderIfDashboard(o)
}
