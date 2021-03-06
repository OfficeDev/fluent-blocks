import isString from 'lodash/isString'

import {
  DescribedInlineContentProps as NaturalDescribedInlineContentProps,
  DescribedInlineEntity as NaturalDescribedInlineEntity,
} from '@fluent-blocks/schemas'

import {
  EscapeElement,
  Sequence,
  invalidInline,
  renderIfEscape,
} from '../../lib'
import { AvatarElement, renderIfAvatar } from '../Avatar/Avatar'
import {
  DescribedIconElement,
  renderIfDescribedIcon,
} from '../Icon/DescribedIcon'
import { IconElement, renderIfIcon } from '../Icon/Icon'
import { LinkElement, renderIfLink } from '../Link/Link'
import {
  DescribedTextElement,
  renderIfDescribedText,
} from '../Text/DescribedText'
import { TextElement, renderIfText } from '../Text/Text'
import { renderAsTextIfString } from './Inline'

export type DescribedInlineEntity =
  | NaturalDescribedInlineEntity
  | DescribedTextElement
  | TextElement
  | DescribedIconElement
  | IconElement
  | LinkElement
  | AvatarElement
  | EscapeElement

export type DescribedInlineSequence = DescribedInlineEntity[]

export type DescribedInlineSequenceOrString = string | DescribedInlineSequence

export interface DescribedInlineContentProps
  extends Omit<NaturalDescribedInlineContentProps, 'inlines'> {
  inlines: DescribedInlineSequenceOrString
}

/**
 * This component primarily serves as a way to route to more specific inline
 * elements based on which properties are present.
 */
export const DescribedInline = (o: DescribedInlineEntity) =>
  renderAsTextIfString(o) ||
  renderIfDescribedIcon(o) ||
  renderIfIcon(o) ||
  renderIfDescribedText(o) ||
  renderIfText(o) ||
  renderIfLink(o) ||
  renderIfAvatar(o) ||
  renderIfEscape(o) ||
  invalidInline(o)

/**
 * An ordered set of inline elements to render together.
 */
export const DescribedInlineContent = ({
  inlines,
}: DescribedInlineContentProps) =>
  inlines
    ? isString(inlines)
      ? renderIfText({ text: inlines })
      : Sequence<DescribedInlineEntity>(
          inlines.map((inline) =>
            isString(inline) ? { text: inline } : inline
          ),
          DescribedInline
        )
    : null
