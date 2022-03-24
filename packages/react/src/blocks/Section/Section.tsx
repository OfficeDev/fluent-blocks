import { createElement } from 'react'

import { key, Sequence } from '../../lib'
import { InlineSequenceOrString } from '../../inlines'

import { Block, BlockEntity, BlockSequence } from '../Block/Block'
import { Paragraph } from '../Paragraph/Paragraph'
import { Heading } from '../Heading/Heading'
import { BigMessage, BigMessageProps } from '../BigMessage/BigMessage'
import { HeadingLevel } from '@fluent-blocks/schemas'

interface ShallowSectionContentProps {
  title: InlineSequenceOrString
  abstract?: InlineSequenceOrString
  message?: Omit<BigMessageProps['message'], 'title' | 'variant' | 'abstract'>
  blocks?: BlockSequence
}

// 𝔅𝔢𝔥𝔬𝔩𝔡 𝔱𝔥𝔦𝔰 𝔰𝔲𝔟𝔩𝔦𝔪𝔢 𝔭𝔶𝔯𝔞𝔪𝔦𝔡
export interface SectionContentProps extends ShallowSectionContentProps {
  sections?: (ShallowSectionContentProps & {
    sections?: (ShallowSectionContentProps & {
      sections?: (ShallowSectionContentProps & {
        sections?: (ShallowSectionContentProps & {
          sections?: ShallowSectionContentProps[]
        })[]
      })[]
    })[]
  })[]
}

export interface SectionContextualProps {
  className?: string
  level?: HeadingLevel
  as?: string
}

export interface SectionProps
  extends SectionContentProps,
    SectionContextualProps {}

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
        <Section
          {...section}
          key={key(section)}
          level={(level + 1) as HeadingLevel}
        />
      ))}
    </>
  )
}
