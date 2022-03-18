import { z } from 'zod'
import { ReactElement, useCallback } from 'react'
import {
  Button as FluentButton,
  Tooltip,
  makeStyles,
  mergeClasses as cx,
} from '@fluentui/react-components'
import {
  buttonProps as naturalButtonProps,
  buttonActionPayload,
} from '@fluent-blocks/schemas'

import {
  actionHandler,
  propsElementUnion,
  useFluentBlocksContext,
  rem,
  sx,
} from '../../lib'
import { Icon } from '../../inlines'
import { shortInputContextualVariants } from '../input-properties'

export type ButtonActionPayload = z.infer<typeof buttonActionPayload>

export const buttonProps = naturalButtonProps
  .merge(actionHandler(buttonActionPayload))
  .merge(shortInputContextualVariants)
export type ButtonProps = z.infer<typeof buttonProps>

const useButtonStyles = makeStyles({
  root: {
    ...sx.margin(0),
    flexShrink: 0,
  },
  fill: {
    width: '100%',
  },
  tab: {
    position: 'relative',
    fontWeight: 'var(--fontWeightRegular)',
    color: 'var(--colorNeutralForeground2)',
    ...sx.transition('color', '.2s', 'linear'),
    '&:after': {
      content: '""',
      position: 'absolute',
      insetBlockEnd: 0,
      insetInlineStart: rem(12),
      insetInlineEnd: rem(12),
      height: rem(2),
      ...sx.borderRadius('var(--borderRadiusCircular)'),
      backgroundColor: 'var(--colorTransparentBackground)',
      ...sx.transition(
        'background-color, inset-inline-start, inset-inline-end',
        '.2s, .2s, .2s',
        'linear, ease-in-out, ease-in-out'
      ),
    },
    '&:hover': {
      color: 'var(--colorNeutralForeground1)',
      '&:after': {
        backgroundColor: 'var(--colorNeutralStroke1)',
      },
    },
    '&:active': {
      color: 'inherit',
      '&:after': {
        backgroundColor: 'var(--colorBrandForeground1)',
      },
    },
  },
  tabSelected: {
    fontWeight: 'var(--fontWeightSemibold)',
    '&:after': {
      backgroundColor: 'var(--colorBrandForeground1)',
    },
    '&:hover': {
      '&:after': {
        backgroundColor: 'var(--colorBrandForeground1)',
        insetInlineStart: rem(4),
        insetInlineEnd: rem(4),
      },
    },
    '&:active': {
      color: 'inherit',
      '&:after': {
        insetInlineStart: rem(4),
        insetInlineEnd: rem(4),
        backgroundColor: 'var(--colorCompoundBrandStrokePressed)',
      },
    },
  },
  toolbarItemInFlow: {
    minWidth: rem(32),
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
  contextualVariant = 'block-inputs',
}: ButtonProps) => {
  const context = useFluentBlocksContext()

  const onButtonActivate = useCallback(() => {
    const payload = { type: 'activate' as 'activate', actionId }
    onAction && onAction(payload)
    context.onAction(payload)
  }, [onAction, actionId])

  const buttonStyles = useButtonStyles()

  const derivedSize =
    contextualVariant === 'card-inputs' ? 'small' : size || 'medium'
  const derivedIconSize =
    iconSize || derivedSize === 'small' ? 16 : derivedSize === 'large' ? 32 : 24

  const button = (
    <FluentButton
      aria-label={label}
      appearance={variant}
      size={derivedSize}
      className={cx(
        buttonStyles.root,
        contextualVariant === 'narrow-inputs' && buttonStyles.fill,
        contextualVariant === 'tabs' && buttonStyles.tab,
        contextualVariant === 'tabs' && selected && buttonStyles.tabSelected,
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
            variant={
              contextualVariant === 'tabs'
                ? selected
                  ? 'filled'
                  : 'outline'
                : iconVariant || 'outline'
            }
          />
        ),
      })}
      onClick={onButtonActivate}
      id={`${contextualVariant}__${actionId}`}
      {...(selected && { 'aria-selected': selected })}
      {...(controls && { 'aria-controls': controls })}
      {...(contextualVariant === 'tabs' && {
        role: 'tab',
        ...(!selected && { tabIndex: -1 }),
      })}
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

function isButtonProps(o: any): o is ButtonProps {
  return o && 'type' in o && o.type === 'button'
}

function isButtonElement(
  o: any
): o is ReactElement<ButtonProps, typeof Button> {
  return o?.type === Button
}

export const buttonPropsOrElement = propsElementUnion<
  typeof buttonProps,
  typeof Button
>(buttonProps)
export type ButtonPropsOrElement = z.infer<typeof buttonPropsOrElement>

export function renderIfButton(o: any) {
  return isButtonProps(o) ? <Button {...o} /> : isButtonElement(o) ? o : null
}
