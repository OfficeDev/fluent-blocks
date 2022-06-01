import { TopbarProps as NaturalTopbarProps } from '@fluent-blocks/schemas'
import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'

import { Toolbar } from '../../blocks/Toolbar/Toolbar'
import { Button } from '../../inputs'
import { rem, sx, useCommonStyles, useFluentBlocksContext } from '../../lib'
import { ContextualViewStateProps, SidebarState } from '../../props'
import { sidebarWidth, useSidebarInvoker } from '../Sidebar'
import { topbarHeight } from './topbarHeight'

export interface TopbarProps
  extends NaturalTopbarProps,
    ContextualViewStateProps {}

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
  nonInvokerInner: {
    display: 'contents',
  },
  'nonInvokerInner--sidebarActive': {
    visibility: 'hidden',
  },
  'inner--hc': {
    borderBlockEndColor: 'var(--colorNeutralForeground1)',
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
      role="menubar"
      className={cx(
        topbarStyles.root,
        sidebarState === SidebarState.Active &&
          topbarStyles['root--sidebarActive'],
        sidebarState === SidebarState.Docked &&
          topbarStyles['root--sidebarDocked']
      )}
    >
      <div
        role="none"
        className={cx(
          topbarStyles.inner,
          commonStyles.elevatedSurface,
          themeName === 'highContrast' && topbarStyles['inner--hc']
        )}
      >
        {hasSidebarInvoker && (
          <Button
            button={{ ...sidebarInvokerAction.button, variant: 'subtle' }}
          />
        )}
        <div
          role="none"
          className={cx(
            topbarStyles.nonInvokerInner,
            sidebarState === SidebarState.Active &&
              topbarStyles['nonInvokerInner--sidebarActive']
          )}
        >
          {near?.menu && (
            <Toolbar
              toolbar={{ menu: near.menu }}
              contextualVariant="viewportWidth"
              contextualRole="group"
            />
          )}
          {far?.menu && (
            <Toolbar
              toolbar={{ menu: far.menu }}
              contextualVariant="viewportWidth"
              contextualJustifyEnd
              contextualRole="group"
            />
          )}
        </div>
      </div>
    </div>
  )
}
