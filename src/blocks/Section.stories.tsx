import { Section, SectionProps } from './Section'

export default {
  title: 'Tests/Section',
  component: Section,
}

const SectionTemplate = (props: SectionProps) => <Section {...props} />

export const SectionTest: typeof SectionTemplate & { args?: SectionProps } =
  SectionTemplate.bind({})

SectionTest.args = {
  title: [{ text: 'Title' }],
  abstract: [{ text: 'Abstract' }],
}
