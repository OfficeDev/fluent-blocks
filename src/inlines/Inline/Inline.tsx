import { z } from 'zod'

import {
  invalidInline,
  escapeElement,
  renderIfEscape,
  Sequence,
} from '../../lib'

import { textPropsOrElement, renderIfText } from '../Text/Text'
import { iconPropsOrElement, renderIfIcon } from '../Icon/Icon'

export const inlineEntity = z.union([
  textPropsOrElement,
  iconPropsOrElement,
  escapeElement,
])
export type InlineEntity = z.infer<typeof inlineEntity>

export const inlineSequence = z.array(inlineEntity)
export type InlineSequence = z.infer<typeof inlineSequence>

export const inlineContentProps = z.object({
  inlines: inlineSequence,
})
export type InlineContentProps = z.infer<typeof inlineContentProps>

/**
 * This component primarily serves as a way to route to more specific inline
 * elements based on which properties are present.
 */
export const Inline = (o: InlineEntity) =>
  renderIfIcon(o) || renderIfText(o) || renderIfEscape(o) || invalidInline(o)

/**
 * An ordered set of inline elements to render together.
 */
export const InlineContent = (props: InlineContentProps) => {
  const { inlines } = props
  return <>{Sequence<InlineEntity>(inlines, Inline)}</>
}
