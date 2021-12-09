import { z } from 'zod'
import { createElement } from 'react'

import { key, Sequence } from '../../lib'
import { inlineSequence } from '../../inlines'

import { Block, BlockEntity, blockSequence } from '../Block/Block'
import { Paragraph } from '../Paragraph/Paragraph'
import { Heading } from '../Heading/Heading'
import { BigMessage, bigMessageProps } from '../BigMessage/BigMessage'

const nonRecursiveSectionContentProps = {
  title: inlineSequence,
  abstract: inlineSequence.optional(),
  message: bigMessageProps.shape.message
    .omit({ title: true, variant: true, abstract: true })
    .optional(),
  blocks: blockSequence.optional(),
}

// 𝔅𝔢𝔥𝔬𝔩𝔡 𝔱𝔥𝔦𝔰 𝔰𝔲𝔟𝔩𝔦𝔪𝔢 𝔭𝔶𝔯𝔞𝔪𝔦𝔡
export const sectionContentProps = z.object({
  ...nonRecursiveSectionContentProps,
  sections: z
    .array(
      z.object({
        ...nonRecursiveSectionContentProps,
        sections: z
          .array(
            z.object({
              ...nonRecursiveSectionContentProps,
              sections: z
                .array(
                  z.object({
                    ...nonRecursiveSectionContentProps,
                    sections: z
                      .array(
                        z.object({
                          ...nonRecursiveSectionContentProps,
                          sections: z
                            .array(
                              z.object({
                                ...nonRecursiveSectionContentProps,
                              })
                            )
                            .optional(),
                        })
                      )
                      .optional(),
                  })
                )
                .optional(),
            })
          )
          .optional(),
      })
    )
    .optional(),
})
export type SectionContentProps = z.infer<typeof sectionContentProps>

const sectionManagedProps = z.object({
  className: z.string().optional(),
  level: z.number().default(2).optional(),
  as: z.string().default('section').optional(),
})
type SectionManagedProps = z.infer<typeof sectionManagedProps>

export const sectionProps = sectionManagedProps.merge(sectionContentProps)
export type SectionProps = z.infer<typeof sectionProps>

export const Section = (props: SectionProps) => {
  const {
    title,
    abstract,
    sections,
    blocks,
    className,
    message,
    as = 'section',
    level = 2,
  } = props
  return createElement(
    as,
    { className },
    <>
      {(message && (
        <BigMessage
          {...{
            message: {
              ...message,
              variant: 'big',
              title,
              abstract,
              viewportHeight: false,
            },
            level,
          }}
        />
      )) || (
        <>
          <Heading paragraph={title} level={level} />
          {abstract && <Paragraph paragraph={abstract} />}
        </>
      )}
      {Sequence<BlockEntity>(blocks, Block)}
      {(sections || []).map((section, _s) => (
        <Section {...section} key={key(section)} level={level + 1} />
      ))}
    </>
  )
}
