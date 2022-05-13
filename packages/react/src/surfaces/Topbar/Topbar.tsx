import { TopbarProps as NaturalTopbarProps } from '@fluent-blocks/schemas'
import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'

import { Toolbar } from '../../blocks/Toolbar/Toolbar'
import { rem, sx, useCommonStyles, useFluentBlocksContext } from '../../lib'
import {
  ContextualViewStateProps,
  MenuItemSequence,
  SidebarState,
} from '../../props'
import { useSidebarInvoker } from '../Sidebar/Sidebar'

export interface TopbarProps
  extends NaturalTopbarProps,
    ContextualViewStateProps {}

export const topbarHeight = 49

const useTopbarStyles = makeStyles({
  root: {
    position: 'absolute',
    insetBlockStart: 0,
    insetInlineStart: 0,
    insetInlineEnd: 0,
    boxShadow: 'var(--content-elevation)',
  },
  inner: {
    backgroundColor: 'var(--surface-background)',
    color: 'var(--surface-foreground)',
    ...sx.padding(rem(8)),
    borderBlockEndWidth: '1px',
    borderBlockEndStyle: 'solid',
    borderBlockEndColor: 'transparent',
    height: rem(topbarHeight),
    boxSizing: 'border-box',
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
  const hasSidebarInvoker =
    contextualViewState &&
    contextualViewState.sidebarState &&
    (contextualViewState.sidebarState === SidebarState.Active ||
      contextualViewState.sidebarState === SidebarState.Hidden)
  const sidebarInvokerAction = useSidebarInvoker(contextualViewState)
  return (
    <div className={cx(topbarStyles.root)}>
      <div
        className={cx(
          topbarStyles.inner,
          commonStyles.elevatedSurface,
          themeName === 'highContrast' && topbarStyles['inner--hc']
        )}
      >
        {near?.menu || hasSidebarInvoker ? (
          <Toolbar
            toolbar={{
              menu: hasSidebarInvoker
                ? [sidebarInvokerAction, ...(near?.menu ?? [])]
                : (near!.menu as MenuItemSequence),
            }}
          />
        ) : (
          <div role="none" className={topbarStyles.gap} />
        )}
      </div>
    </div>
  )
}
