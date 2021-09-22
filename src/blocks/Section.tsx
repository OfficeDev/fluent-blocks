import { z } from 'zod'
import { createElement } from 'react'
import { inlineSequence, InlineSequence } from '../inlines'
import { blockSequence, BlockSequence } from './Blocks'
import { Paragraph } from './Paragraph'
import { Heading } from './Heading'
import { Block } from './Block'
import { key } from '../lib/keys'

export type SectionProps = {
  title: InlineSequence
  abstract?: InlineSequence
  blocks?: BlockSequence
  sections?: SectionSequence
}

export const sectionProps: z.ZodSchema<SectionProps> = z.lazy(() =>
  z.object({
    title: inlineSequence,
    abstract: inlineSequence.optional(),
    blocks: blockSequence.optional(),
    sections: sectionSequence.optional(),
  })
)

export type SectionSequence = SectionProps[]

export const sectionSequence: z.ZodSchema<SectionSequence> =
  z.array(sectionProps)

const topLevelSectionProps = z.object({
  className: z.string().optional(),
  level: z.number().default(2),
  as: z.string().default('section'),
})

type TopLevelSectionProps = z.infer<typeof topLevelSectionProps>

// TODO: understand zod better
export const sectionComponentProps: z.ZodSchema<
  SectionProps & TopLevelSectionProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = topLevelSectionProps.merge(sectionProps as any) as any

export type SectionComponentProps = Partial<TopLevelSectionProps> & SectionProps

/**
 *
 * @param blocks
 * An ordered set of block elements which are rendered after the title & abstract of the parent section and before any subsections.
 * @param sections
 * An ordered set of sections, which are children of the parent section or the main surface, and which are rendered after the parent’s blocks. Sections are used to determine a view’s table of contents.
 */

export const Section = (props: SectionComponentProps) => {
  const { title, abstract, sections, blocks, className, as, level } =
    sectionComponentProps.parse(props)
  return createElement(
    as,
    { className },
    <>
      {title && <Heading paragraph={title} level={level ?? 2} />}
      {abstract && <Paragraph paragraph={abstract} />}
      {(blocks || []).map((block) => (
        <Block {...block} key={key(block)} />
      ))}
      {(sections || []).map((section, s) => (
        <Section {...section} key={key(section)} as={as} level={level + 1} />
      ))}
    </>
  )
}
