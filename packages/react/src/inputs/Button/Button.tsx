import { ReactElement, useCallback } from 'react'

import {
  ButtonActionPayload as NaturalButtonActionPayload,
  ButtonProps as NaturalButtonProps,
} from '@fluent-blocks/schemas'
import {
  Button as FluentButton,
  Tooltip,
  mergeClasses as cx,
  makeStyles,
} from '@fluentui/react-components'

import { Icon } from '../../inlines'
import { rem, sx, useFluentBlocksContext } from '../../lib'
import { ShortInputContextualProps, WithActionHandler } from '../../props'

export type ButtonActionPayload = NaturalButtonActionPayload

export interface ButtonProps
  extends NaturalButtonProps,
    WithActionHandler<ButtonActionPayload>,
    ShortInputContextualProps {}

const useButtonStyles = makeStyles({
  root: {
    ...sx.margin(0),
    textOverflow: 'ellipsis',
    minWidth: rem(32),
    maxWidth: '100%',
    flexShrink: 0,
  },
  fill: {
    width: '100%',
  },
  toolbarItemInFlow: {
    order: 1,
  },
  toolbarItemNeedsUpdate: {
    visibility: 'hidden',
  },
  toolbarItemHidden: {
    display: 'none',
  },
})

export const Button = ({
  label,
  iconOnly,
  icon,
  iconPosition,
  variant,
  size,
  iconSize,
  iconVariant,
  actionId,
  onAction,
  selected,
  controls,
  disabled,
  payload,
  contextualVariant = 'block-inputs',
}: ButtonProps) => {
  const { onAction: contextOnAction } = useFluentBlocksContext()

  const onButtonActivate = useCallback(() => {
    const actionPayload = {
      type: 'activate' as 'activate',
      actionId,
      ...payload,
    }
    onAction && onAction(actionPayload)
    contextOnAction && contextOnAction(actionPayload)
  }, [onAction, actionId, payload])

  const buttonStyles = useButtonStyles()

  const derivedSize =
    contextualVariant === 'card-inputs' ? 'small' : size || 'medium'
  const derivedIconSize =
    iconSize || derivedSize === 'small' ? 16 : derivedSize === 'large' ? 32 : 24

  const button = (
    <FluentButton
      aria-label={label}
      appearance={variant}
      disabled={disabled}
      size={derivedSize}
      className={cx(
        buttonStyles.root,
        contextualVariant === 'narrow-inputs' && buttonStyles.fill,
        contextualVariant.startsWith('toolbar-item') &&
          buttonStyles.toolbarItemInFlow,
        contextualVariant === 'toolbar-item--needs-update' &&
          buttonStyles.toolbarItemNeedsUpdate,
        contextualVariant === 'toolbar-item--hidden' &&
          buttonStyles.toolbarItemHidden
      )}
      {...{ iconOnly, iconPosition }}
      {...(icon && {
        icon: (
          <Icon
            icon={icon}
            size={derivedIconSize}
            variant={iconVariant || 'outline'}
          />
        ),
      })}
      onClick={onButtonActivate}
      id={`${contextualVariant}__${actionId}`}
      {...(selected && { 'aria-selected': selected })}
      {...(controls && { 'aria-controls': controls })}
    >
      {iconOnly ? null : label}
    </FluentButton>
  )

  return iconOnly ? (
    <Tooltip content={label} relationship="label" withArrow>
      {button}
    </Tooltip>
  ) : (
    button
  )
}

export type ButtonElement = ReactElement<ButtonProps, typeof Button>
export type ButtonPropsOrElement = ButtonProps | ButtonElement

function isButtonProps(o: any): o is ButtonProps {
  return o && 'type' in o && o.type === 'action'
}

function isButtonElement(o: any): o is ButtonElement {
  return o?.type === Button
}

export function renderIfButton(o: any) {
  return isButtonProps(o) ? <Button {...o} /> : isButtonElement(o) ? o : null
}
