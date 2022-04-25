import noop from 'lodash/noop'

import { OverflowProps as NaturalOverflowProps } from '@fluent-blocks/schemas'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tooltip,
  makeStyles,
} from '@fluentui/react-components'

import { Icon } from '../../inlines'
import { Sequence, sx, useFluentBlocksContext } from '../../lib'
import {
  ActionHandler,
  MenuAction,
  MenuItemEntity,
  MenuItemSequence,
} from '../../props'

export interface OverflowProps extends Omit<NaturalOverflowProps, 'overflow'> {
  overflow: MenuItemSequence
  contextualHiddenFlags?: { hidden?: boolean }[]
  triggerIcon?: string
  triggerLabel?: string
}

function isAction(o: any): o is MenuAction {
  return 'actionId' in o
}

const defaultIconSize = 16

const useOverflowStyles = makeStyles({
  trigger: {
    color: 'inherit',
    ...sx.flex(0, 0, 'auto'),
  },
})

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
          ...item.payload,
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
  triggerIcon = 'more_horizontal',
  triggerLabel,
}: OverflowProps) => {
  const { translations, onAction } = useFluentBlocksContext()
  const overflowStyles = useOverflowStyles()
  const label = triggerLabel || translations.more
  return overflow.length ? (
    <Menu>
      <MenuTrigger>
        <Tooltip content={label} relationship="label" withArrow>
          <MenuButton
            appearance="transparent"
            className={overflowStyles.trigger}
            icon={<Icon icon={triggerIcon} size={iconSize} variant="outline" />}
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
  ) : null
}
