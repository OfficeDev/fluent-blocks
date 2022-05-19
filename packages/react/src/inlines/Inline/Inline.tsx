import get from 'lodash/get'
import isString from 'lodash/isString'

import {
  InlineContentProps as NaturalInlineContentProps,
  InlineEntity as NaturalInlineEntity,
} from '@fluent-blocks/schemas'

import {
  EscapeElement,
  Sequence,
  invalidInline,
  renderIfEscape,
} from '../../lib'
import { IconElement, renderIfIcon } from '../Icon/Icon'
import { TextElement, renderIfText } from '../Text/Text'

export type InlineEntity =
  | NaturalInlineEntity
  | TextElement
  | IconElement
  | EscapeElement

export type InlineSequence = InlineEntity[]

export type InlineSequenceOrString = string | InlineSequence

export interface InlineContentProps
  extends Omit<NaturalInlineContentProps, 'inlines'> {
  inlines: InlineSequenceOrString
}

export function renderAsTextIfString(o: any) {
  return isString(o) ? renderIfText({ text: o }) : null
}

/**
 * This component primarily serves as a way to route to more specific inline
 * elements based on which properties are present.
 */
export const Inline = (o: InlineEntity) =>
  renderAsTextIfString(o) ||
  renderIfIcon(o) ||
  renderIfText(o) ||
  renderIfEscape(o) ||
  invalidInline(o)

/**
 * An ordered set of inline elements to render together.
 */
export const InlineContent = (props: InlineContentProps) => {
  const { inlines } = props
  return (
    <>
      {inlines
        ? isString(inlines)
          ? renderIfText({ text: inlines })
          : Sequence<InlineEntity>(
              inlines.map((inline) =>
                isString(inline) ? { text: inline } : inline
              ),
              Inline
            )
        : null}
    </>
  )
}
