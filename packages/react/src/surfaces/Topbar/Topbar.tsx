import { TopbarProps as NaturalTopbarProps } from '@fluent-blocks/schemas'
import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'

import { Toolbar } from '../../blocks/Toolbar/Toolbar'
import { Button } from '../../inputs'
import { rem, sx, useCommonStyles, useFluentBlocksContext } from '../../lib'
import { ContextualViewStateProps, SidebarState } from '../../props'
import { sidebarWidth, useSidebarInvoker } from '../Sidebar/Sidebar'

export interface TopbarProps
  extends NaturalTopbarProps,
    ContextualViewStateProps {}

export const topbarHeight = 48

const useTopbarStyles = makeStyles({
  root: {
    position: 'absolute',
    insetBlockStart: 0,
    insetInlineStart: 0,
    insetInlineEnd: 0,
    boxShadow: 'var(--content-elevation)',
  },
  'root--sidebarActive': {
    insetInlineStart: rem(sidebarWidth),
    insetInlineEnd: rem(-sidebarWidth),
  },
  'root--sidebarDocked': {
    insetInlineStart: rem(sidebarWidth),
  },
  inner: {
    backgroundColor: 'var(--surface-background)',
    color: 'var(--surface-foreground)',
    ...sx.padding(rem(8), rem(8), rem(7), rem(8)),
    borderBlockEndWidth: '1px',
    borderBlockEndStyle: 'solid',
    borderBlockEndColor: 'transparent',
    height: rem(topbarHeight),
    boxSizing: 'border-box',
    display: 'flex',
    ...sx.gap(rem(4)),
  },
  'inner--hc': {
    borderBlockEndColor: 'var(--colorNeutralForeground1)',
  },
  gap: {
    ...sx.flex(1, 0, '0'),
  },
})

export const Topbar = ({ near, far, contextualViewState }: TopbarProps) => {
  const topbarStyles = useTopbarStyles()
  const commonStyles = useCommonStyles()
  const { themeName } = useFluentBlocksContext()
  const sidebarState = contextualViewState?.sidebarState
  const hasSidebarInvoker =
    sidebarState === SidebarState.Active || sidebarState === SidebarState.Hidden
  const sidebarInvokerAction = useSidebarInvoker(contextualViewState)
  return (
    <div
      className={cx(
        topbarStyles.root,
        sidebarState === SidebarState.Active &&
          topbarStyles['root--sidebarActive'],
        sidebarState === SidebarState.Docked &&
          topbarStyles['root--sidebarDocked']
      )}
    >
      <div
        className={cx(
          topbarStyles.inner,
          commonStyles.elevatedSurface,
          themeName === 'highContrast' && topbarStyles['inner--hc']
        )}
      >
        {hasSidebarInvoker && (
          <Button {...sidebarInvokerAction} variant="subtle" />
        )}
        {near?.menu ? (
          <Toolbar toolbar={{ menu: near.menu }} />
        ) : (
          <div role="none" className={topbarStyles.gap} />
        )}
      </div>
    </div>
  )
}
