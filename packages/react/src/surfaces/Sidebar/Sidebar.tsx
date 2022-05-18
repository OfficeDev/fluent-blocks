import noop from 'lodash/noop'
import { Dispatch, SetStateAction, useCallback } from 'react'

import {
  SidebarItemProps as NaturalSidebarItemProps,
  SidebarProps as NaturalSidebarProps,
} from '@fluent-blocks/schemas'
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  mergeClasses as cx,
  makeStyles,
} from '@fluentui/react-components'

import { Heading } from '../../blocks'
import { InlineContent, InlineSequenceOrString } from '../../inlines'
import { Button, ButtonProps } from '../../inputs'
import { rem, sx, useCommonStyles, useFluentBlocksContext } from '../../lib'
import {
  ContextualViewStateProps,
  MenuItemSequence,
  SidebarState,
} from '../../props'
import { sidebarWidth } from './sidebarWidth'

export interface SidebarItemProps
  extends Omit<NaturalSidebarItemProps, 'label' | 'menu'> {
  label: InlineSequenceOrString
  menu: MenuItemSequence
}

export interface SidebarProps
  extends Omit<NaturalSidebarProps, 'title' | 'items'>,
    ContextualViewStateProps {
  title: InlineSequenceOrString
  items: SidebarItemProps[]
}

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
    ...sx.padding(rem(16)),
    borderInlineEndWidth: '1px',
    borderInlineEndStyle: 'solid',
    borderInlineEndColor: 'transparent',
  },
  'inner--hc': {
    borderInlineEndColor: 'var(--colorNeutralForeground1)',
  },
  paddedContent: {
    marginInlineEnd: rem(-16),
    marginInlineStart: rem(-16),
  },
})

export const Sidebar = ({
  title,
  items,
  defaultOpenItems,
  contextualViewState,
}: SidebarProps) => {
  const sidebarStyles = useSidebarStyles()
  const commonStyles = useCommonStyles()
  const { themeName } = useFluentBlocksContext()
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
        <Heading paragraph={title} level={1} contextualVariant="card" />
        <Accordion
          multiple
          className={sidebarStyles.paddedContent}
          defaultOpenItems={
            defaultOpenItems || items.map(({ actionId }) => actionId)
          }
        >
          {items.map(({ actionId, label, menu }) => (
            <AccordionItem key={actionId} value={actionId}>
              <AccordionHeader as="h2">
                <InlineContent inlines={label} />
              </AccordionHeader>
              <AccordionPanel>
                {menu.map((menuItem) => {
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
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
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
  },
})

function sidebarStatePropsFromViewState(
  contextualViewState: ContextualViewStateProps['contextualViewState']
) {
  return {
    sidebarState: SidebarState.Never,
    setSidebarState: noop,
    ...contextualViewState,
  }
}

function useSidebarActionHandler(
  sidebarState: SidebarState,
  setSidebarState: Dispatch<SetStateAction<SidebarState>>
) {
  return useCallback(() => {
    if (sidebarState === SidebarState.Active) {
      return setSidebarState(SidebarState.Hidden)
    }
    if (sidebarState === SidebarState.Hidden) {
      return setSidebarState(SidebarState.Active)
    }
  }, [sidebarState, setSidebarState])
}

export function useSidebarInvoker(
  contextualViewState: ContextualViewStateProps['contextualViewState']
): ButtonProps {
  const { sidebarState, setSidebarState } =
    sidebarStatePropsFromViewState(contextualViewState)

  const { translations } = useFluentBlocksContext()

  const onAction = useSidebarActionHandler(sidebarState, setSidebarState)

  return {
    type: 'action',
    actionId: 'invoke-sidebar',
    label:
      sidebarState === SidebarState.Active
        ? translations['sidebar__close']
        : translations['sidebar__open'],
    icon: sidebarState === SidebarState.Active ? 'dismiss' : 'apps_list',
    iconOnly: true,
    variant: 'outline',
    onAction,
  }
}

export const SidebarInvoker = ({
  contextualViewState,
}: ContextualViewStateProps) => {
  const sidebarInvokerStyles = useSidebarInvokerStyles()

  const { sidebarState } = sidebarStatePropsFromViewState(contextualViewState)

  const sidebarInvokerAction = useSidebarInvoker(contextualViewState)

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
        >
          <Button {...sidebarInvokerAction} />
        </div>
      )
  }
}

const useSidebarScrimStyles = makeStyles({
  root: {
    position: 'absolute',
  },
  'root--active': {
    insetInlineStart: rem(sidebarWidth),
    insetInlineEnd: 0,
    insetBlockStart: 0,
    insetBlockEnd: 0,
    backgroundColor: 'var(--colorNeutralShadowKeyDarker)',
  },
})

export const SidebarScrim = ({
  contextualViewState,
}: ContextualViewStateProps) => {
  const { sidebarState, setSidebarState } =
    sidebarStatePropsFromViewState(contextualViewState)
  const onAction = useSidebarActionHandler(sidebarState, setSidebarState)
  const sidebarScrimStyles = useSidebarScrimStyles()
  return (
    <div
      className={cx(
        sidebarScrimStyles.root,
        sidebarState === SidebarState.Active &&
          sidebarScrimStyles['root--active']
      )}
      onClick={onAction}
    />
  )
}
