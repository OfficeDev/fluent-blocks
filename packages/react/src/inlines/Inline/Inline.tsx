import { z } from 'zod'
import isString from 'lodash/isString'
import {
  inlineEntity as naturalInlineEntity,
  inlineContentProps as naturalInlineContentProps,
} from '@fluentui/blocks-schemas'

import {
  invalidInline,
  escapeElement,
  renderIfEscape,
  Sequence,
} from '../../lib'

import { textElement, renderIfText } from '../Text/Text'
import { iconElement, renderIfIcon } from '../Icon/Icon'

export const inlineEntity = z.union([
  naturalInlineEntity,
  textElement,
  iconElement,
  escapeElement,
])
export type InlineEntity = z.infer<typeof inlineEntity>

export const inlineSequence = z.array(inlineEntity)
export type InlineSequence = z.infer<typeof inlineSequence>

export const inlineSequenceOrString = z.union([z.string(), inlineSequence])
export type InlineSequenceOrString = z.infer<typeof inlineSequenceOrString>

export const inlineContentProps = naturalInlineContentProps.merge(
  z.object({ inlines: inlineSequenceOrString })
)
export type InlineContentProps = z.infer<typeof inlineContentProps>

function renderAsTextIfString(o: any) {
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
      {isString(inlines)
        ? renderIfText({ text: inlines })
        : Sequence<InlineEntity>(inlines, Inline)}
    </>
  )
}
