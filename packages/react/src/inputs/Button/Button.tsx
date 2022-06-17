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
import { makePayload, rem, sx, useFluentBlocksContext } from '../../lib'
import { ShortInputContextualProps, WithActionHandler } from '../../props'

export type ButtonActionPayload = NaturalButtonActionPayload

export interface ButtonProps extends ShortInputContextualProps {
  button: NaturalButtonProps['button'] & WithActionHandler<ButtonActionPayload>
  contextualRole?: 'button' | 'menuitem'
}

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
  alignInlineStart: {
    textAlign: 'start',
    justifyContent: 'flex-start',
  },
  wrapContents: {
    display: 'block',
    height: 'auto',
    whiteSpace: 'normal',
    paddingBlockStart: rem(4),
    paddingBlockEnd: rem(4),
    // These are added to override rules applied by @fluentui
    paddingBottom: rem(4),
    paddingTop: rem(4),
  },
  shrink: {
    flexShrink: 1,
  },
  'label--shrink': {
    display: 'block',
    flexShrink: 1,
    minWidth: 0,
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
})

export const Button = ({
  button: {
    label,
    disambiguatingLabel,
    iconOnly,
    icon,
    iconPosition,
    variant,
    size,
    iconSize,
    iconVariant,
    actionId,
    onAction,
    disabled,
    metadata,
    include,
    selected,
    controls,
  },
  contextualVariant = 'block-inputs',
  contextualRole = 'button',
}: ButtonProps) => {
  const { onAction: contextOnAction } = useFluentBlocksContext()

  const onButtonActivate = useCallback(() => {
    const actionPayload = makePayload<ButtonActionPayload>(
      {
        type: 'activate' as 'activate',
        actionId,
      },
      metadata,
      include
    )
    onAction && onAction(actionPayload)
    contextOnAction && contextOnAction(actionPayload)
  }, [onAction, contextOnAction, actionId, metadata, include])

  const buttonStyles = useButtonStyles()

  const derivedSize =
    contextualVariant === 'card-inputs' ? 'small' : size || 'medium'
  const derivedIconSize = iconSize || 20

  const shrink = contextualVariant === 'nav'

  const buttonElement = (
    <FluentButton
      {...{
        role: contextualRole,
        appearance: variant,
        disabled,
        size: derivedSize,
        className: cx(
          buttonStyles.root,
          contextualVariant === 'narrow-inputs' && buttonStyles.fill,
          shrink && buttonStyles.shrink,
          contextualVariant.startsWith('toolbar-item') &&
            buttonStyles.toolbarItemInFlow,
          contextualVariant === 'toolbar-item--needs-update' &&
            buttonStyles.toolbarItemNeedsUpdate,
          contextualVariant === 'toolbar-item--hidden' &&
            buttonStyles.toolbarItemHidden
        ),
        iconOnly,
        iconPosition,
        onClick: onButtonActivate,
        id: actionId,
        ...(icon && {
          icon: (
            <Icon
              icon={icon}
              size={derivedIconSize}
              variant={iconVariant || 'outline'}
            />
          ),
        }),
        ...(!iconOnly &&
          disambiguatingLabel && { 'aria-label': disambiguatingLabel }),
        ...(selected && { 'aria-selected': selected }),
        ...(controls && { 'aria-controls': controls }),
        ...(shrink && { title: disambiguatingLabel || label }),
      }}
    >
      {iconOnly ? null : shrink ? (
        <span className={buttonStyles['label--shrink']}>{label}</span>
      ) : (
        label
      )}
    </FluentButton>
  )

  return iconOnly ? (
    <Tooltip
      content={disambiguatingLabel || label}
      relationship="label"
      withArrow
    >
      {buttonElement}
    </Tooltip>
  ) : (
    buttonElement
  )
}

export type ButtonElement = ReactElement<ButtonProps, typeof Button>
export type ButtonPropsOrElement = ButtonProps | ButtonElement

function isButtonProps(o: any): o is ButtonProps {
  return 'button' in o
}

function isButtonElement(o: any): o is ButtonElement {
  return o?.type === Button
}

export function renderIfButton(o: any) {
  return isButtonProps(o) ? <Button {...o} /> : isButtonElement(o) ? o : null
}
