import { z } from 'zod'
import { ReactElement } from 'react'
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
  toolbarDivider,
  toolbarAction as naturalToolbarAction,
  toolbarProps as naturalToolbarProps,
} from '@fluentui/blocks-schemas'

import { Button, buttonProps } from '../../inputs'
import {
  propsElementUnion,
  rem,
  Sequence,
  useFluentBlocksContext,
} from '../../lib'
import { Icon } from '../../inlines'

export const toolbarAction = naturalToolbarAction.merge(
  buttonProps.omit({
    type: true,
    variant: true,
    size: true,
    iconSize: true,
    contextualVariant: true,
  })
)

export const toolbarItemEntity = z.union([toolbarAction, toolbarDivider])
export type ToolbarItemEntity = z.infer<typeof toolbarItemEntity>

export const toolbarItemSequence = z.array(toolbarItemEntity)

export const toolbarProps = naturalToolbarProps.merge(
  z.object({
    toolbar: naturalToolbarProps.shape.toolbar.merge(
      z.object({
        items: toolbarItemSequence,
      })
    ),
  })
)
export type ToolbarProps = z.infer<typeof toolbarProps>

const toolbarItemContextualOptions = toolbarProps.shape.toolbar.pick({
  iconSize: true,
  buttonSize: true,
})
type ToolbarItemContextualOptions = z.infer<typeof toolbarItemContextualOptions>

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
})

const ToolbarFlexDivider = () => {
  const toolbarStyles = useToolbarStyles()
  return <div role="none" className={toolbarStyles.flexDivider} />
}

const ToolbarItemInMenu = (
  item: ToolbarItemEntity & Partial<ToolbarItemContextualOptions>
) => {
  switch (item.type) {
    case 'action':
      return (
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
  console.log('[item size]', item.buttonSize || defaultButtonSize)
  switch (item.type) {
    case 'action':
      return Button({
        ...item,
        variant: 'transparent',
        size: item.buttonSize || defaultButtonSize,
        iconSize: item.iconSize || defaultIconSize,
        contextualVariant: 'toolbar-item',
        type: 'button',
      })
    default:
      return null
  }
}

const ToolbarOverflow = ({
  items,
  iconSize,
  buttonSize,
}: ToolbarProps['toolbar']) => {
  const { translations } = useFluentBlocksContext()
  return (
    <Menu>
      <MenuTrigger>
        <Tooltip content={translations.more} relationship="label" withArrow>
          <MenuButton
            appearance="transparent"
            icon={
              <Icon
                icon="more_horizontal"
                size={iconSize || defaultIconSize}
                variant="outline"
              />
            }
            size={buttonSize || defaultButtonSize}
            data-layout="special"
          />
        </Tooltip>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {Sequence<ToolbarItemEntity, ToolbarItemContextualOptions>(
            items,
            ToolbarItemInMenu,
            { iconSize }
          )}
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}

export const Toolbar = ({ toolbar }: ToolbarProps) => {
  const toolbarStyles = useToolbarStyles()
  return (
    <div
      className={cx(
        toolbarStyles.root,
        toolbarStyles[`root--${toolbar.buttonSize || defaultButtonSize}`]
      )}
    >
      {Sequence<ToolbarItemEntity, ToolbarItemContextualOptions>(
        toolbar.items,
        ToolbarItemInFlow,
        { iconSize: toolbar.iconSize, buttonSize: toolbar.buttonSize }
      )}
      {ToolbarOverflow(toolbar)}
    </div>
  )
}

function isToolbarProps(o: any): o is ToolbarProps {
  return 'toolbar' in o
}

function isToolbarElement(
  o: any
): o is ReactElement<ToolbarProps, typeof Toolbar> {
  return o?.type === Toolbar
}

export const toolbarPropsOrElement = propsElementUnion<
  typeof toolbarProps,
  typeof Toolbar
>(toolbarProps)
export type ToolbarPropsOrElement = z.infer<typeof toolbarPropsOrElement>

export function renderIfToolbar(o: any) {
  return isToolbarProps(o) ? <Toolbar {...o} /> : isToolbarElement(o) ? o : null
}
