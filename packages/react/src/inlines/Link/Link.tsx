import noop from 'lodash/noop'
import { ReactElement, useCallback } from 'react'

import {
  ButtonActionPayload,
  AnchorProps as NaturalAnchorProps,
  InlineButtonProps as NaturalInlineButtonProps,
} from '@fluent-blocks/schemas'
import { Link as FluentLink } from '@fluentui/react-components'

import { Described, useFluentBlocksContext } from '../../lib'
import { WithActionHandler } from '../../props'

export type AnchorProps = NaturalAnchorProps

export interface InlineButtonProps
  extends NaturalInlineButtonProps,
    WithActionHandler<ButtonActionPayload> {}

export type LinkProps = AnchorProps | InlineButtonProps

function isAnchor(o: any): o is AnchorProps {
  return 'href' in o
}

function isInlineButton(o: any): o is InlineButtonProps {
  return 'actionId' in o
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

  const derivedActionId = isInlineButton(props) ? props.actionId : null
  const derivedOnAction =
    isInlineButton(props) && props.onAction ? props.onAction : noop

  const onLinkActivate = useCallback(() => {
    const actionPayload = {
      type: 'activate' as 'activate',
      actionId: derivedActionId,
    }
    derivedOnAction && derivedOnAction(actionPayload)
    contextOnAction && contextOnAction(actionPayload)
  }, [derivedOnAction, derivedActionId])

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
