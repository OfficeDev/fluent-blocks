import { SidebarProps as NaturalSidebarProps } from '@fluent-blocks/schemas'
import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'

import { Button } from '../../inputs'
import { rem, sx, useCommonStyles, useFluentBlocksContext } from '../../lib'
import { ContextualViewStateProps } from '../../props'

export interface SidebarProps
  extends NaturalSidebarProps,
    ContextualViewStateProps {}

const useSidebarStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    boxShadow: 'var(--content-elevation)',
  },
  inner: {
    width: rem(280),
    boxSizing: 'border-box',
    backgroundColor: 'var(--surface-background)',
    color: 'var(--surface-foreground)',
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '100%',
    ...sx.padding(rem(8)),
    borderInlineEndWidth: '1px',
    borderInlineEndStyle: 'solid',
    borderInlineEndColor: 'transparent',
  },
  'inner--hc': {
    borderInlineEndColor: 'var(--colorNeutralForeground1)',
  },
})

export const Sidebar = (props: SidebarProps) => {
  const sidebarStyles = useSidebarStyles()
  const commonStyles = useCommonStyles()
  const { themeName } = useFluentBlocksContext()
  return (
    <div className={sidebarStyles.root}>
      <div
        className={cx(
          sidebarStyles.inner,
          commonStyles.elevatedSurface,
          themeName === 'highContrast' && sidebarStyles['inner--hc']
        )}
      >
        {props.menu?.map((menuItem) => {
          if (menuItem.type === 'action') {
            return (
              <Button
                key={menuItem.actionId}
                {...menuItem}
                variant="subtle"
                contextualVariant="sidebar"
              />
            )
          }
        })}
      </div>
    </div>
  )
}
