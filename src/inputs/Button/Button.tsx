import { ReactElement, useCallback } from 'react'
import { z } from 'zod'
import { Button as FluentButton } from '@fluentui/react-components'
import { Icon, iconSize, iconVariant } from '../../inlines'
import { propsElementUnion, actionPayload, withActionHandler } from '../../lib'
import { useFluentPatternsContext } from '../../lib/FluentPatternsContext'

export const buttonActivateAction = actionPayload.merge(
  z.object({
    type: z.literal('activate'),
  })
)
export type ButtonActivateAction = z.infer<typeof buttonActivateAction>

export const buttonProps = z.object({
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
export type ButtonProps = z.infer<typeof buttonProps>

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
}: ButtonProps) => {
  const context = useFluentPatternsContext()

  const onButtonActivate = useCallback(() => {
    const payload = { type: 'activate' as 'activate', actionId }
    onAction && onAction(payload)
    context.onAction(payload)
  }, [onAction, actionId])
  return (
    <FluentButton
      block
      aria-label={label}
      appearance={variant}
      {...{ iconOnly, iconPosition }}
      {...(icon && {
        icon: (
          <Icon
            icon={icon}
            size={iconSize || 24}
            variant={iconVariant || 'outline'}
          />
        ),
      })}
      onClick={onButtonActivate}
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
