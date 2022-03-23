import { z } from 'zod'
import { textProps, ZTextProps } from './Text'
import { iconProps, ZIconProps } from './Icon'

export type ZInlineEntity = z.ZodUnion<[z.ZodString, ZTextProps, ZIconProps]>
export type ZInlineSequence = z.ZodArray<ZInlineEntity>
export type ZInlineSequenceOrString = z.ZodUnion<[z.ZodString, ZInlineSequence]>
export type InlineSequenceOrString = z.infer<ZInlineSequenceOrString>
export type ZInlineContentShape = { inlines: ZInlineSequenceOrString }
export type InlineContentProps = { inlines: InlineSequenceOrString }
export type ZInlineContentProps = z.ZodObject<
  ZInlineContentShape,
  'strip',
  z.ZodTypeAny,
  InlineContentProps,
  InlineContentProps
>

export const inlineEntity: ZInlineEntity = z.union([
  z.string(),
  textProps,
  iconProps,
])

export const inlineSequence: ZInlineSequence = z.array(inlineEntity)

export const inlineSequenceOrString: ZInlineSequenceOrString = z.union([
  z.string(),
  inlineSequence,
])

export const inlineContentProps: ZInlineContentProps = z.object({
  inlines: inlineSequenceOrString,
})
