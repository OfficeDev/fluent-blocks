import { Section, SectionProps } from './Section'
import { Text } from '../inlines'

export default {
  title: 'Tests/Section',
  component: Section,
}

const SectionTemplate = (props: SectionProps) => <Section {...props} />

export const SectionJsonTest: typeof SectionTemplate & { args?: SectionProps } =
  SectionTemplate.bind({})

SectionJsonTest.args = {
  title: [{ text: '451e7cfb-23ce-408a-8d5a-75970be8c530' }],
  abstract: [{ text: 'aca0c8ba-b43c-4e9f-b554-960ac12b4633' }],
}

export const SectionJsxTest: typeof SectionTemplate & { args?: SectionProps } =
  SectionTemplate.bind({})

SectionJsxTest.args = {
  title: [<Text text="fc1aece1-c6e0-4285-a37b-58382132fd6f" key="t1" />],
  abstract: [<Text text="fa3ac1fc-1976-459e-9a6e-1b69315cd7be" key="t1" />],
}
