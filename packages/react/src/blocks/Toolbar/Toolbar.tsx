import {
  ReactElement,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import debounce from 'lodash/debounce'
import get from 'lodash/get'
import every from 'lodash/every'

import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import { ToolbarProps as NaturalToolbarProps } from '@fluent-blocks/schemas'

import { Button, ButtonActionPayload, Overflow } from '../../inputs'
import {
  MenuItemEntity,
  MenuItemSequence,
  rem,
  Sequence,
  useCommonStyles,
  WithActionHandler,
} from '../../lib'

export interface ToolbarProps extends Omit<NaturalToolbarProps, 'toolbar'> {
  toolbar: Omit<NaturalToolbarProps['toolbar'], 'items'> & {
    items: MenuItemSequence
  }
  contextualVariant?: 'card' | 'block'
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

const defaultIconSize = 16
const defaultButtonSize = 'medium'

const useToolbarStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
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
  flexDivider: {
    flexGrow: 1,
  },
  overflowTrigger: {
    order: 0,
  },
  'overflowTrigger--ready': {
    order: 2,
  },
  'overflowTrigger--hidden': {
    display: 'none',
  },
})

const ToolbarItemInFlow = (
  item: MenuItemEntity & Partial<ToolbarItemContextualOptions>
) => {
  switch (item.type) {
    case 'action':
      return Button({
        ...item,
        variant: 'transparent',
        size: item.buttonSize || defaultButtonSize,
        iconSize: item.iconSize || defaultIconSize,
        contextualVariant: item.layoutNeedsUpdate
          ? 'toolbar-item--needs-update'
          : item.hidden
          ? 'toolbar-item--hidden'
          : 'toolbar-item',
        type: 'action',
      })
    default:
      return null
  }
}

export const Toolbar = ({
  toolbar,
  contextualVariant = 'block',
}: ToolbarProps) => {
  const commonStyles = useCommonStyles()
  const toolbarStyles = useToolbarStyles()
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
          const actionId = $child.getAttribute('id')?.split('__')[1]
          if (actionId) {
            nextActionsInFlow.push(actionId)
          }
        }
      }
    }
    return new Set(nextActionsInFlow)
  }, [])

  const debouncedUpdateToolbarLayout = useCallback(
    debounce(
      () => {
        setActionsInFlow(getNextActionsInFlow())
        setLayoutNeedsUpdate(false)
      },
      100,
      { leading: false, trailing: true }
    ),
    []
  )

  const handleResize = useCallback(() => {
    setLayoutNeedsUpdate(true)
    debouncedUpdateToolbarLayout()
  }, [])

  useLayoutEffect(() => {
    document.defaultView?.addEventListener('resize', handleResize)
    if ($toolbar.current && layoutNeedsUpdate) {
      setActionsInFlow(getNextActionsInFlow())
      setLayoutNeedsUpdate(false)
    }
    return () =>
      document.defaultView?.removeEventListener('resize', handleResize)
  }, [toolbar, $toolbar.current])

  const menuItemHiddenFlags = layoutNeedsUpdate
    ? undefined
    : toolbar.items.map((item) => ({
        hidden: actionsInFlow.has(get(item, 'actionId', false)),
      }))
  const hideOverflowTrigger = menuItemHiddenFlags
    ? every(menuItemHiddenFlags, (flags) => flags.hidden)
    : false

  return (
    <div
      className={cx(
        toolbarStyles.root,
        toolbarStyles[`root--${toolbar.buttonSize || defaultButtonSize}`],
        contextualVariant === 'block' && commonStyles.mainContentWidth,
        contextualVariant === 'block' && commonStyles.centerBlock
      )}
      ref={$toolbar}
    >
      {Sequence<MenuItemEntity, ToolbarItemContextualOptions>(
        toolbar.items,
        ToolbarItemInFlow,
        {
          iconSize: toolbar.iconSize,
          buttonSize: toolbar.buttonSize,
          layoutNeedsUpdate,
        },
        layoutNeedsUpdate
          ? undefined
          : toolbar.items.map((item) => ({
              hidden: !actionsInFlow.has(get(item, 'actionId', false)),
            }))
      )}
      <div
        data-layout="required"
        className={cx(
          toolbarStyles.overflowTrigger,
          !layoutNeedsUpdate && toolbarStyles['overflowTrigger--ready'],
          hideOverflowTrigger && toolbarStyles['overflowTrigger--hidden']
        )}
      >
        <Overflow
          overflow={toolbar.items}
          contextualHiddenFlags={menuItemHiddenFlags}
          iconSize={toolbar.iconSize || defaultIconSize}
          buttonSize={toolbar.buttonSize || defaultButtonSize}
        />
      </div>
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
