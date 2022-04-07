import noop from 'lodash/noop'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tooltip,
  MenuItem,
} from '@fluentui/react-components'
import { OverflowProps as NaturalOverflowProps } from '@fluent-blocks/schemas'

import { Icon } from '../../inlines'
import {
  MenuItemSequence,
  MenuItemEntity,
  Sequence,
  useFluentBlocksContext,
  MenuAction,
  ActionHandler,
} from '../../lib'

export interface OverflowProps extends Omit<NaturalOverflowProps, 'overflow'> {
  overflow: MenuItemSequence
  contextualHiddenFlags?: { hidden?: boolean }[]
}

function isAction(o: any): o is MenuAction {
  return 'actionId' in o
}

const defaultIconSize = 16

const OverflowItem = (
  item: MenuItemEntity & {
    hidden?: boolean
    contextOnAction?: ActionHandler<any>
  }
) => {
  const onItemActivate = isAction(item)
    ? () => {
        const payload = {
          type: 'activate' as 'activate',
          actionId: item.actionId,
        }
        item.onAction && item.onAction(payload)
        item.contextOnAction && item.contextOnAction(payload)
      }
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

export const Overflow = ({
  overflow,
  buttonSize = 'medium',
  iconSize = defaultIconSize,
  contextualHiddenFlags,
}: OverflowProps) => {
  const { translations, onAction } = useFluentBlocksContext()
  return (
    <Menu>
      <MenuTrigger>
        <Tooltip content={translations.more} relationship="label" withArrow>
          <MenuButton
            appearance="transparent"
            icon={
              <Icon icon="more_horizontal" size={iconSize} variant="outline" />
            }
            size={buttonSize}
          />
        </Tooltip>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {Sequence<MenuItemEntity>(
            overflow,
            OverflowItem,
            { iconSize, contextOnAction: onAction },
            contextualHiddenFlags
          )}
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}
