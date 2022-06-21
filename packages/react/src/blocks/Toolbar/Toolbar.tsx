import every from 'lodash/every'
import get from 'lodash/get'
import { ReactElement, useCallback, useRef, useState } from 'react'

import {
  ToolbarProps as NaturalToolbarProps,
  SingleValueInputActionPayload,
} from '@fluent-blocks/schemas'
import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'

import {
  Button,
  ButtonActionPayload,
  Overflow,
  ShortTextInput,
} from '../../inputs'
import {
  Sequence,
  rem,
  useCommonStyles,
  useFluentBlocksContext,
  useLayoutResize,
} from '../../lib'
import {
  MenuItemEntity,
  MenuItemSequence,
  WithActionHandler,
} from '../../props'

export interface ToolbarProps extends Omit<NaturalToolbarProps, 'toolbar'> {
  toolbar: Omit<NaturalToolbarProps['toolbar'], 'menu'> & {
    menu: MenuItemSequence
  }
  contextualVariant?: 'block' | 'viewportWidth'
  contextualFindProps?: {
    onAction: (payload: SingleValueInputActionPayload) => void
  }
  contextualJustifyEnd?: boolean
  contextualRole?: 'menubar' | 'group'
}

type ToolbarItemContextualOptions = Pick<
  ToolbarProps['toolbar'],
  'iconSize' | 'buttonSize'
> &
  Partial<
    WithActionHandler<ButtonActionPayload> & {
      layoutNeedsUpdate: boolean
      hidden: boolean
    }
  >

const defaultIconSize = 20
const defaultButtonSize = 'medium'

const useToolbarStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: rem(48),
  },
  find: {
    order: 3,
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  'root--small': {
    height: rem(24),
  },
  'root--medium': {
    height: rem(32),
  },
  'root--large': {
    height: rem(40),
  },
  'root--justifyEnd': {
    flexDirection: 'row-reverse',
  },
  flexDivider: {
    flexGrow: 1,
  },
  requiredInFlow: {
    order: 0,
  },
  'requiredInFlow--ready': {
    order: 2,
  },
  'requiredInFlow--hidden': {
    display: 'none',
  },
})

const ToolbarItemInFlow = (
  item: MenuItemEntity & Partial<ToolbarItemContextualOptions>
) => {
  if ('action' in item) {
    return Button({
      button: {
        ...item.action,
        variant: item.action.variant || 'transparent',
        size: item.buttonSize || defaultButtonSize,
        iconSize: item.iconSize || defaultIconSize,
      },
      contextualVariant: item.layoutNeedsUpdate
        ? 'toolbar-item--needs-update'
        : item.hidden
        ? 'toolbar-item--hidden'
        : 'toolbar-item',
      contextualRole: 'menuitem',
    })
  } else {
    return null
  }
}

export const Toolbar = ({
  toolbar,
  contextualVariant = 'block',
  contextualFindProps,
  contextualJustifyEnd,
  contextualRole = 'menubar',
}: ToolbarProps) => {
  const commonStyles = useCommonStyles()
  const toolbarStyles = useToolbarStyles()
  const { translations } = useFluentBlocksContext()
  const $toolbar = useRef<HTMLDivElement | null>(null)
  const [layoutNeedsUpdate, setLayoutNeedsUpdate] = useState(true)
  const [actionsInFlow, setActionsInFlow] = useState<Set<string>>(new Set())

  const getNextActionsInFlow = useCallback(() => {
    const $trigger = $toolbar.current?.querySelector('[data-layout]')
    const $children = $toolbar.current?.children
    const nextActionsInFlow = []
    if ($children && $trigger instanceof HTMLElement) {
      const baseOffset = $trigger.offsetTop
      for (let i = 0; i < $children.length; i++) {
        const $child = $children.item(i)
        if (
          $child &&
          $child instanceof HTMLElement &&
          !$child.hasAttribute('data-layout') &&
          $child.offsetTop === baseOffset
        ) {
          const actionId = $child.getAttribute('id')
          if (actionId) {
            nextActionsInFlow.push(actionId)
          }
        }
      }
    }
    return new Set(nextActionsInFlow)
  }, [])

  const onComputeResize = useCallback(() => {
    setActionsInFlow(getNextActionsInFlow())
    setLayoutNeedsUpdate(false)
  }, [])

  const onResizeStart = useCallback(() => {
    setLayoutNeedsUpdate(true)
  }, [])

  useLayoutResize($toolbar, onComputeResize, onResizeStart)

  const menuItemHiddenFlags = layoutNeedsUpdate
    ? undefined
    : toolbar.menu.map((item) => ({
        hidden:
          item.hidden ||
          actionsInFlow.has(get(item, ['action', 'actionId'], false)),
      }))

  const hideOverflowTrigger = menuItemHiddenFlags
    ? every(menuItemHiddenFlags, (flags) => flags.hidden)
    : false

  return (
    <div
      role={contextualRole}
      className={cx(
        toolbarStyles.root,
        toolbarStyles[`root--${toolbar.buttonSize || defaultButtonSize}`],
        contextualJustifyEnd && toolbarStyles['root--justifyEnd'],
        contextualVariant === 'block' && commonStyles.mainContentWidth,
        contextualVariant === 'block' && commonStyles.centerBlock
      )}
      ref={$toolbar}
    >
      {Sequence<MenuItemEntity, ToolbarItemContextualOptions>(
        toolbar.menu,
        ToolbarItemInFlow,
        {
          iconSize: toolbar.iconSize,
          buttonSize: toolbar.buttonSize,
          layoutNeedsUpdate,
        },
        layoutNeedsUpdate
          ? undefined
          : toolbar.menu.map((item) => ({
              hidden:
                item.hidden ||
                !actionsInFlow.has(get(item, ['action', 'actionId'], false)),
            }))
      )}
      <div
        role="none"
        data-layout="required"
        className={cx(
          toolbarStyles.requiredInFlow,
          !layoutNeedsUpdate && toolbarStyles['requiredInFlow--ready'],
          hideOverflowTrigger && toolbarStyles['requiredInFlow--hidden']
        )}
      >
        <Overflow
          overflow={toolbar.menu}
          contextualHiddenFlags={menuItemHiddenFlags}
          iconSize={toolbar.iconSize || defaultIconSize}
          buttonSize={toolbar.buttonSize || defaultButtonSize}
          contextualRole="menuitem"
        />
      </div>
      {toolbar.find && (
        <div
          role="none"
          data-layout="required"
          className={cx(
            toolbarStyles.requiredInFlow,
            toolbarStyles.find,
            !layoutNeedsUpdate && toolbarStyles['requiredInFlow--ready']
          )}
        >
          <ShortTextInput
            {...{
              textInput: {
                actionId: toolbar.find,
                inputType: 'search',
                labelVariant: 'visuallyHidden',
                label: translations['list__find'],
                placeholder: translations['list__find'],
                after: { icon: 'document_search' },
                ...(contextualFindProps?.onAction && {
                  onAction: (payload) => contextualFindProps.onAction(payload),
                }),
              },
              contextualVariant: 'toolbar-item',
            }}
          />
        </div>
      )}
    </div>
  )
}

export type ToolbarElement = ReactElement<ToolbarProps, typeof Toolbar>
export type ToolbarPropsOrElement = ToolbarProps | ToolbarElement

function isToolbarProps(o: any): o is ToolbarProps {
  return 'toolbar' in o
}

function isToolbarElement(o: any): o is ToolbarElement {
  return o?.type === Toolbar
}

export function renderIfToolbar(o: any) {
  return isToolbarProps(o) ? <Toolbar {...o} /> : isToolbarElement(o) ? o : null
}
