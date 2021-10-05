import { z } from 'zod'
import { textPropsOrElement, renderIfText } from './Text'
import { iconPropsOrElement, renderIfIcon } from './Icon'
import { invalidInline } from '../lib/warnings'
import { escapeElement, renderIfEscape } from '../lib/Escape'
import { key } from '../lib'
import { cloneElement } from 'react'

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
  return (
    <>
      {(inlines ?? []).map((o) => {
        // todo: why does React throw "Warning: Inline: `key` is not a prop" here if
        //  Inline is called using the spread operator like Section does for
        //  <Block {...block} key={…}/> without encountering that error?
        const contentElement = Inline(o)
        return contentElement && cloneElement(contentElement, { key: key(o) })
      })}
    </>
  )
}
