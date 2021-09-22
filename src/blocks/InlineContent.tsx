import { z } from 'zod'
import { inlineSequence } from '../inlines'
import { Text, isTextProps } from '../inlines/Text'
import { Icon, isIconProps } from '../inlines/Icon'
import { invalidInline } from '../lib/warnings'
import { key } from '../lib/keys'

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
      {(inlines ?? []).map((inline) => isIconProps(inline) ? (
          <Icon {...inline} key={key(inline)} />
        ) : isTextProps(inline) ? (
          <Text {...inline} key={key(inline)} />
        ) : (
          invalidInline(inline)
        ))}
    </>
  )
}
