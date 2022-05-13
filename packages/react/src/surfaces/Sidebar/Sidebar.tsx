import noop from 'lodash/noop'
import { useCallback } from 'react'

import { SidebarProps as NaturalSidebarProps } from '@fluent-blocks/schemas'
import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'

import { Button } from '../../inputs'
import { rem, sx, useCommonStyles, useFluentBlocksContext } from '../../lib'
import { ContextualViewStateProps, SidebarState } from '../../props'

export interface SidebarProps
  extends NaturalSidebarProps,
    ContextualViewStateProps {}

export const sidebarWidth = 228

const useSidebarStyles = makeStyles({
  root: {
    position: 'absolute',
    insetBlockStart: 0,
    insetBlockEnd: 0,
    insetInlineStart: rem(-sidebarWidth),
    boxShadow: 'var(--content-elevation)',
  },
  'root--docked': {
    insetInlineStart: 0,
  },
  'root--active': {
    insetInlineStart: 0,
  },
  inner: {
    width: rem(sidebarWidth),
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
  const { contextualViewState } = props
  return (
    <div
      className={cx(
        sidebarStyles.root,
        contextualViewState?.sidebarState === SidebarState.Active &&
          sidebarStyles['root--active'],
        contextualViewState?.sidebarState === SidebarState.Docked &&
          sidebarStyles['root--docked']
      )}
    >
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

const useSidebarInvokerStyles = makeStyles({
  root: {
    ...sx.padding(rem(8)),
    position: 'absolute',
    insetBlockStart: 0,
    insetInlineStart: 0,
  },
  'root--active': {
    insetInlineStart: rem(sidebarWidth),
    insetBlockEnd: 0,
    insetInlineEnd: 0,
    backgroundColor: 'var(--colorNeutralShadowKeyDarker)',
  },
})

export const SidebarInvoker = ({
  contextualViewState,
}: ContextualViewStateProps) => {
  const sidebarInvokerStyles = useSidebarInvokerStyles()
  const { sidebarState, setSidebarState } = contextualViewState || {
    sidebarState: SidebarState.Never,
    setSidebarState: noop,
  }
  const { translations } = useFluentBlocksContext()
  const onAction = useCallback(() => {
    if (sidebarState === SidebarState.Active) {
      return (setSidebarState || noop)(SidebarState.Hidden)
    }
    if (sidebarState === SidebarState.Hidden) {
      return (setSidebarState || noop)(SidebarState.Active)
    }
  }, [sidebarState, setSidebarState])
  switch (sidebarState) {
    case SidebarState.Never:
      return null
    case SidebarState.Docked:
      return null
    default:
      return (
        <div
          className={cx(
            sidebarInvokerStyles.root,
            sidebarState === SidebarState.Active &&
              sidebarInvokerStyles['root--active']
          )}
          onClick={onAction}
        >
          <Button
            {...{
              type: 'action',
              actionId: 'invoke-sidebar',
              label:
                sidebarState === SidebarState.Active
                  ? translations['sidebar__close']
                  : translations['sidebar__open'],
              icon:
                sidebarState === SidebarState.Active ? 'dismiss' : 'apps_list',
              iconOnly: true,
              variation: 'subtle',
              onAction,
            }}
          />
        </div>
      )
  }
}
