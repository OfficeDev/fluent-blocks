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
import noop from 'lodash/noop'

import {
  makeStyles,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tooltip,
  mergeClasses as cx,
} from '@fluentui/react-components'

import {
  ToolbarDivider,
  ToolbarAction as NaturalToolbarAction,
  ToolbarProps as NaturalToolbarProps,
} from '@fluent-blocks/schemas'

import { Button, ButtonActionPayload, ButtonProps } from '../../inputs'
import {
  rem,
  Sequence,
  useCommonStyles,
  useFluentBlocksContext,
  WithActionHandler,
} from '../../lib'
import { Icon } from '../../inlines'

export interface ToolbarAction
  extends NaturalToolbarAction,
    Omit<
      ButtonProps,
      'type' | 'variant' | 'size' | 'iconSze' | 'contextualVariant'
    > {}

export type ToolbarItemEntity = ToolbarAction | ToolbarDivider

export type ToolbarItemSequence = ToolbarItemEntity[]

export interface ToolbarProps extends Omit<NaturalToolbarProps, 'toolbar'> {
  toolbar: Omit<NaturalToolbarProps['toolbar'], 'items'> & {
    items: ToolbarItemSequence
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

const ToolbarItemInMenu = (
  item: ToolbarItemEntity & Partial<ToolbarItemContextualOptions>
) => {
  const context = useFluentBlocksContext()

  const onItemActivate = item.hasOwnProperty('actionId')
    ? useCallback(() => {
        const payload = {
          type: 'activate' as 'activate',
          actionId: (item as ToolbarAction).actionId,
        }
        item.onAction && item.onAction(payload)
        context.onAction(payload)
      }, [item])
    : noop

  switch (item.type) {
    case 'action':
      return item.hidden ? null : (
        <MenuItem
          {...(item.icon && {
            icon: (
              <Icon
                icon={item.icon}
                size={item.iconSize || defaultIconSize}
                variant="outline"
              />
            ),
          })}
          onClick={onItemActivate}
        >
          {item.label}
        </MenuItem>
      )
    default:
      return null
  }
}

const ToolbarItemInFlow = (
  item: ToolbarItemEntity & Partial<ToolbarItemContextualOptions>
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
      {Sequence<ToolbarItemEntity, ToolbarItemContextualOptions>(
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
      <Menu>
        <MenuTrigger>
          <Tooltip content={translations.more} relationship="label" withArrow>
            <MenuButton
              appearance="transparent"
              icon={
                <Icon
                  icon="more_horizontal"
                  size={toolbar.iconSize || defaultIconSize}
                  variant="outline"
                />
              }
              size={toolbar.buttonSize || defaultButtonSize}
              data-layout="required"
              className={cx(
                toolbarStyles.overflowTrigger,
                !layoutNeedsUpdate && toolbarStyles['overflowTrigger--ready'],
                hideOverflowTrigger && toolbarStyles['overflowTrigger--hidden']
              )}
            />
          </Tooltip>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {Sequence<ToolbarItemEntity, ToolbarItemContextualOptions>(
              toolbar.items,
              ToolbarItemInMenu,
              { iconSize: toolbar.iconSize },
              menuItemHiddenFlags
            )}
          </MenuList>
        </MenuPopover>
      </Menu>
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
