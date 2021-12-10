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
    iconOnly: z.boolean().optional(),
    icon: z.string().optional(),
    iconPosition: z.union([z.literal('before'), z.literal('after')]).optional(),
    iconSize: iconSize.optional(),
    iconVariant: iconVariant.optional(),
    ...withActionHandler(buttonActivateAction),
  })
  .merge(
    z
      .object({
        contextualVariant: z
          .union([z.literal('inputs'), z.literal('tabs')])
          .default('inputs'),
        selected: z.boolean().default(false),
        controls: z.string(),
      })
      .partial()
  )
export type ButtonProps = z.infer<typeof buttonProps>

const useButtonStyles = makeStyles({
  root: {
    margin: 'inherit',
    flexShrink: 0,
  },
  tabSelected: (theme) => ({
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      insetBlockEnd: 0,
      insetInlineStart: rem(8),
      insetInlineEnd: rem(8),
      height: rem(2),
      borderRadius: theme.borderRadiusCircular,
      backgroundColor: theme.colorBrandForeground1,
    },
  }),
})

export const Button = ({
  label,
  iconOnly,
  icon,
  iconPosition,
  variant,
  iconSize,
  iconVariant,
  actionId,
  onAction,
  contextualVariant,
  selected,
  controls,
}: ButtonProps) => {
  const context = useFluentPatternsContext()

  const onButtonActivate = useCallback(() => {
    const payload = { type: 'activate' as 'activate', actionId }
    onAction && onAction(payload)
    context.onAction(payload)
  }, [onAction, actionId])

  const buttonStyles = useButtonStyles()

  return (
    <FluentButton
      {...(contextualVariant !== 'tabs' && { block: true })}
      aria-label={label}
      appearance={variant}
      className={cx(
        buttonStyles.root,
        contextualVariant === 'tabs' && selected && buttonStyles.tabSelected
      )}
      {...{ iconOnly, iconPosition }}
      {...(icon && {
        icon: (
          <Icon
            icon={icon}
            size={iconSize || 24}
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
