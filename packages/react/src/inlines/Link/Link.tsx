import { KeyboardEvent, MouseEvent, ReactElement, useCallback } from 'react'

import {
  ButtonActionPayload,
  AnchorProps as NaturalAnchorProps,
  InlineButtonProps as NaturalInlineButtonProps,
} from '@fluent-blocks/schemas'
import { Link as FluentLink } from '@fluentui/react-components'

import { Described, useFluentBlocksContext } from '../../lib'
import { WithActionHandler } from '../../props'

export interface InlineButtonProps
  extends NaturalInlineButtonProps,
    WithActionHandler<ButtonActionPayload> {}

interface AnchorPropsPlain
  extends NaturalAnchorProps,
    WithActionHandler<ButtonActionPayload> {
  preferActionHandler?: false
  actionId?: string
}

interface AnchorPropsPrefersActionHandler
  extends Omit<AnchorPropsPlain, 'preferActionHandler'> {
  preferActionHandler: true
  actionId: string
}

export type AnchorProps = AnchorPropsPlain | AnchorPropsPrefersActionHandler

export type LinkProps = AnchorProps | InlineButtonProps

function isAnchor(o: any): o is AnchorProps {
  return 'href' in o
}

function isInlineButton(o: any): o is InlineButtonProps {
  return !('href' in o)
}

export const Link = ({
  link,
  variant,
  disabled,
  description,
  external,
  targetBlank,
  ...props
}: LinkProps) => {
  const { translations, onAction: contextOnAction } = useFluentBlocksContext()

  const linkIsAnchor = isAnchor(props)
  const linkIsInlineButton = isInlineButton(props)
  const preferActionHandler = linkIsAnchor ? props.preferActionHandler : true

  const derivedOnAction =
    (linkIsInlineButton || (linkIsAnchor && props.preferActionHandler)) &&
    props.onAction
      ? props.onAction
      : undefined

  const onLinkActivate = useCallback(
    (e: MouseEvent | KeyboardEvent) => {
      if (
        linkIsAnchor &&
        preferActionHandler &&
        (derivedOnAction || contextOnAction)
      ) {
        e.preventDefault()
      }
      const actionPayload = {
        type: 'activate' as 'activate',
        actionId: props.actionId!,
      }
      derivedOnAction && derivedOnAction(actionPayload)
      contextOnAction && contextOnAction(actionPayload)
    },
    [
      props.actionId,
      preferActionHandler,
      linkIsAnchor,
      derivedOnAction,
      contextOnAction,
    ]
  )

  const derivedDescription = [
    ...(external && targetBlank
      ? [translations['link--externalTargetBlank']]
      : external
      ? [translations['link--external']]
      : targetBlank
      ? [translations['link--targetBlank']]
      : []),
    ...(description ? [description] : []),
  ].join(' ')

  const fluentLinkArgs = {
    inline: true,
    children: link,
    ...(variant === 'subtle' && { appearance: 'subtle' as 'subtle' }),
    ...(disabled && { disabled: true, disabledFocusable: true }),
    ...(isAnchor(props)
      ? {
          as: 'a' as 'a',
          href: props.href,
          ...(targetBlank && { target: '_blank', rel: 'noopener' }),
          ...(props.preferActionHandler && { onClick: onLinkActivate }),
        }
      : {
          as: 'button' as 'button',
          onClick: onLinkActivate,
        }),
  }

  const linkElement = <FluentLink {...fluentLinkArgs} />

  return Described(linkElement, derivedDescription)
}

export type LinkElement = ReactElement<LinkProps, typeof Link>

function isLinkProps(o: any): o is LinkProps {
  return 'link' in o
}

function isLinkElement(o: any): o is LinkElement {
  return o?.type === Link
}

export function renderIfLink(o: any) {
  return isLinkProps(o) ? <Link {...o} /> : isLinkElement(o) ? o : null
}
