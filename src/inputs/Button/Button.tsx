import { z } from 'zod'
import { ReactElement, useCallback } from 'react'
import {
  Button as FluentButton,
  makeStyles,
  mergeClasses as cx,
} from '@fluentui/react-components'

import {
  propsElementUnion,
  actionPayload,
  withActionHandler,
  useFluentPatternsContext,
  rem,
} from '../../lib'
import { Icon, iconSize, iconVariant } from '../../inlines'
import { shortInputContextualVariants } from '../input-properties'

export const buttonActivateAction = actionPayload.merge(
  z.object({
    type: z.literal('activate'),
  })
)
export type ButtonActivateAction = z.infer<typeof buttonActivateAction>

export const buttonProps = z
  .object({
    // buttons can't be 'required', so that property is excluded
    type: z.literal('button'),
    label: z.string().min(1), // this is intentionally not `inlineSequence` and it must not be an empty string
    actionId: z.string(),
    variant: z
      .union([
        z.literal('outline'),
        z.literal('primary'),
        z.literal('subtle'),
        z.literal('transparent'),
      ])
      .optional(),
    size: z
      .union([z.literal('small'), z.literal('medium'), z.literal('large')])
      .optional(),
    iconOnly: z.boolean().optional(),
    icon: z.string().optional(),
    iconPosition: z.union([z.literal('before'), z.literal('after')]).optional(),
    iconSize: iconSize.optional(),
    iconVariant: iconVariant.optional(),
    ...withActionHandler(buttonActivateAction),
  })
  .merge(shortInputContextualVariants)
export type ButtonProps = z.infer<typeof buttonProps>

const useButtonStyles = makeStyles({
  root: {
    margin: 'inherit',
    flexShrink: 0,
  },
  tab: (theme) => ({
    position: 'relative',
    fontWeight: theme.fontWeightRegular,
    color: theme.colorNeutralForeground2,
    transition: 'color .2s linear',
    '&:after': {
      content: '""',
      position: 'absolute',
      insetBlockEnd: 0,
      insetInlineStart: rem(12),
      insetInlineEnd: rem(12),
      height: rem(2),
      borderRadius: theme.borderRadiusCircular,
      backgroundColor: theme.colorTransparentBackground,
      transition:
        'background-color .2s linear, inset-inline-start .2s ease-in-out, inset-inline-end .2s ease-in-out',
    },
    '&:hover': {
      color: theme.colorNeutralForeground1,
      '&:after': {
        backgroundColor: theme.colorNeutralStroke1,
      },
    },
    '&:active': {
      color: 'inherit',
      '&:after': {
        backgroundColor: theme.colorBrandForeground1,
      },
    },
  }),
  tabSelected: (theme) => ({
    fontWeight: theme.fontWeightSemibold,
    '&:after': {
      backgroundColor: theme.colorBrandForeground1,
    },
    '&:hover': {
      '&:after': {
        backgroundColor: theme.colorBrandForeground1,
        insetInlineStart: rem(4),
        insetInlineEnd: rem(4),
      },
    },
    '&:active': {
      color: 'inherit',
      '&:after': {
        insetInlineStart: rem(4),
        insetInlineEnd: rem(4),
        backgroundColor: theme.colorCompoundBrandStrokePressed,
      },
    },
  }),
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
  const context = useFluentPatternsContext()

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

  return (
    <FluentButton
      aria-label={label}
      appearance={variant}
      size={derivedSize}
      className={cx(
        buttonStyles.root,
        contextualVariant === 'tabs' && buttonStyles.tab,
        contextualVariant === 'tabs' && selected && buttonStyles.tabSelected
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
      id={actionId}
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
