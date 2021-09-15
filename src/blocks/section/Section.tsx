import { Section as SectionProps } from '../../../types/view'
import { Paragraph, Heading } from '../paragraph/Paragraph'
import { Block } from '../Block'
import concat from 'lodash/concat'

export type SectionPropsWithPath = SectionProps & { path: string[] }

const levelSeparator = ':'
const blockSeparator = '.'

export const Section = ({ title, abstract, sections, blocks, path }: SectionPropsWithPath) => (
  <>
    <Heading paragraph={title} level={path.length} />
    <Paragraph paragraph={abstract} />
    {(blocks || []).map((block, b) => (
      <Block {...block} key={`${path.join(levelSeparator)}${blockSeparator}${b}`} />
    ))}
    {(sections || []).map((section, s) => {
      const nextPath = concat(path, `${s}`)
      return <Section {...section} path={nextPath} key={nextPath.join(levelSeparator)} />
    })}
  </>
)
