import { z } from 'zod'
import { key } from '../lib'
import { textPropsOrElement, renderIfText } from './Text'
import { iconPropsOrElement, renderIfIcon } from './Icon'
import { invalidInline } from '../lib/warnings'

export const inlineProps = z.union([textPropsOrElement, iconPropsOrElement])

export const inlineSequence = z.array(inlineProps)

export type InlineSequence = z.infer<typeof inlineSequence>

export const inlineContentProps = z.object({
  inlines: inlineSequence,
})

export type InlineContentProps = z.infer<typeof inlineContentProps>

/**
 * An ordered set of phrasing elements to render inline together.
 */

export const InlineContent = (props: InlineContentProps) => {
  const { inlines } = inlineContentProps.parse(props)
  return (
    <>
      {(inlines ?? []).map(
        (inline) =>
          renderIfIcon(inline) || renderIfText(inline) || invalidInline(inline)
      )}
    </>
  )
}
