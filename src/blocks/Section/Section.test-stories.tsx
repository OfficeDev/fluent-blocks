import { Section, SectionProps } from './Section'
import { Text, Icon } from '../../inlines'
import { Escape } from '../../lib/Escape'

export default {
  title: 'Tests/Section',
  component: Section,
}

const SectionTemplate = (props: SectionProps) => <Section {...props} />

export const SectionJsonTest: typeof SectionTemplate & { args?: SectionProps } =
  SectionTemplate.bind({})

SectionJsonTest.args = {
  title: [
    { text: '451e7cfb-23ce-408a-8d5a-75970be8c530' },
    { icon: 'animal_cat' },
  ],
  abstract: [
    { text: 'aca0c8ba-b43c-4e9f-b554-960ac12b4633' },
    { icon: 'diversity' },
  ],
}

export const SectionJsxTest: typeof SectionTemplate & { args?: SectionProps } =
  SectionTemplate.bind({})

SectionJsxTest.args = {
  title: [
    <Text text="fc1aece1-c6e0-4285-a37b-58382132fd6f" key="t1" />,
    <Icon icon="animal_cat" key="t2" />,
  ],
  abstract: [
    <Text text="fa3ac1fc-1976-459e-9a6e-1b69315cd7be" key="t1" />,
    <Icon icon="diversity" key="t2" />,
  ],
}

export const SectionEscapeTest: typeof SectionTemplate & {
  args?: SectionProps
} = SectionTemplate.bind({})

SectionEscapeTest.args = {
  title: [
    <Escape contentMeetsAccessibilityAndDesignStandards={true} key="t1">
      <span>8e86641e-3efc-472c-bcb1-a7d74c1080fc</span>
    </Escape>,
  ],
}
