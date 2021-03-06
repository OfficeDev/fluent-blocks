import { InlineSequenceOrString } from '../inlines'
import { BigMessageProps } from './BigMessage'
import { BlockSequence } from './Block'

interface ShallowSectionContentProps {
  title: InlineSequenceOrString
  abstract?: InlineSequenceOrString
  message?: Omit<BigMessageProps['message'], 'title' | 'variant' | 'abstract'>
  blocks?: BlockSequence
}

// ππ’π₯π¬π©π‘ π±π₯π¦π° π°π²ππ©π¦πͺπ’ π­πΆπ―ππͺπ¦π‘
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
