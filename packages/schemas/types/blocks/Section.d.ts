import { InlineSequenceOrString } from '../inlines'
import { BigMessageProps } from './BigMessage'
import { BlockSequence } from './Block'

interface ShallowSectionContentProps {
  title: InlineSequenceOrString
  abstract?: InlineSequenceOrString
  message?: Omit<BigMessageProps['message'], 'title' | 'variant' | 'abstract'>
  blocks?: BlockSequence
}

// 𝔅𝔢𝔥𝔬𝔩𝔡 𝔱𝔥𝔦𝔰 𝔰𝔲𝔟𝔩𝔦𝔪𝔢 𝔭𝔶𝔯𝔞𝔪𝔦𝔡
export interface SectionProps extends ShallowSectionContentProps {
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
