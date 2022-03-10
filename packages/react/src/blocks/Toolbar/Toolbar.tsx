import { z } from 'zod'
import { ReactElement } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tooltip,
} from '@fluentui/react-components'

import {
  toolbarDivider,
  toolbarAction as naturalToolbarAction,
  toolbarProps as naturalToolbarProps,
} from '@fluentui/blocks-schemas'

import { Button, buttonProps } from '../../inputs'
import { propsElementUnion, Sequence } from '../../lib'
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
    toolbar: z.object({
      items: toolbarItemSequence,
    }),
  })
)
export type ToolbarProps = z.infer<typeof toolbarProps>

const ToolbarItemInMenu = (item: ToolbarItemEntity) => {
  if (item.type === 'action') {
    return <MenuItem>{item.label}</MenuItem>
  } else {
    return null
  }
}

const ToolbarItemInFlow = (item: ToolbarItemEntity) => {
  if (item.type === 'action') {
    return (
      <Button
        {...item}
        {...{ variation: 'transparent', size: 'medium', iconSize: 16 }}
        type="button"
      />
    )
  } else {
    return null
  }
}

const ToolbarOverflow = ({ items }: ToolbarProps['toolbar']) => (
  <Menu>
    <MenuTrigger>
      <Tooltip
        content="With calendar icon and no contents"
        relationship="label"
      >
        <MenuButton
          icon={<Icon icon="more_horizontal" size={16} variant="outline" />}
        />
      </Tooltip>
    </MenuTrigger>
    <MenuPopover>
      <MenuList>
        {Sequence<ToolbarItemEntity>(items, ToolbarItemInMenu)}
      </MenuList>
    </MenuPopover>
  </Menu>
)

export const Toolbar = ({ toolbar }: ToolbarProps) => (
  <div>
    {Sequence<ToolbarItemEntity>(toolbar.items, ToolbarItemInFlow)}
    <ToolbarOverflow {...toolbar} />
  </div>
)

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
