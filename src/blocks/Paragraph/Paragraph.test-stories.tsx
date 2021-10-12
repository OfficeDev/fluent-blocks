import { Paragraph, ParagraphProps } from './Paragraph'
import { Text } from '../../inlines'
import { Escape } from '../../lib'
import { Parameters } from '@storybook/addons'

export default {
  title: 'Tests/Paragraph',
  component: Paragraph,
}

const ParagraphTemplate = (props: ParagraphProps) => <Paragraph {...props} />

export const ParagraphJsonTest: typeof ParagraphTemplate & {
  args?: ParagraphProps
  parameters?: Parameters
} = ParagraphTemplate.bind({})

ParagraphJsonTest.args = {
  paragraph: [{ text: '386b63ae-db03-41c3-b40b-bb4658cd1dfc' }],
}
ParagraphJsonTest.parameters = { chromatic: { disableSnapshot: true } }

export const ParagraphJsxTest: typeof ParagraphTemplate & {
  args?: ParagraphProps
  parameters?: Parameters
} = ParagraphTemplate.bind({})

ParagraphJsxTest.args = {
  paragraph: [<Text text="29b23c46-1883-4d7f-90a3-58ece7bf2f1c" key="t1" />],
}
ParagraphJsxTest.parameters = { chromatic: { disableSnapshot: true } }

export const ParagraphEscapeTest: typeof ParagraphTemplate & {
  args?: ParagraphProps
  parameters?: Parameters
} = ParagraphTemplate.bind({})

ParagraphEscapeTest.args = {
  paragraph: [
    <Escape contentMeetsAccessibilityAndDesignStandards={true} key="t1">
      <span>f37a1350-622b-422b-b306-9bd342d67779</span>
    </Escape>,
  ],
}
ParagraphEscapeTest.parameters = { chromatic: { disableSnapshot: true } }
