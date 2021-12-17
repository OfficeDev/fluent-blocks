import { Paragraph, ParagraphProps } from './Paragraph'
import { Text } from '../../inlines'
import { Escape } from '../../lib'
import { Parameters } from '@storybook/addons'

export default {
  title: 'Tests/Paragraph',
  component: Paragraph,
}

const ParagraphTemplate = (props: ParagraphProps) => <Paragraph {...props} />

export const ParagraphJson1Test: typeof ParagraphTemplate & {
  args?: ParagraphProps
  parameters?: Parameters
} = ParagraphTemplate.bind({})

ParagraphJson1Test.args = {
  paragraph: [{ text: '386b63ae-db03-41c3-b40b-bb4658cd1dfc' }],
}
ParagraphJson1Test.parameters = { chromatic: { disableSnapshot: true } }

export const ParagraphJson2Test: typeof ParagraphTemplate & {
  args?: ParagraphProps
  parameters?: Parameters
} = ParagraphTemplate.bind({})

ParagraphJson2Test.args = {
  paragraph: ['0a874649-8283-4300-8b7e-3be36da8ae47'],
}
ParagraphJson2Test.parameters = { chromatic: { disableSnapshot: true } }

export const ParagraphJson3Test: typeof ParagraphTemplate & {
  args?: ParagraphProps
  parameters?: Parameters
} = ParagraphTemplate.bind({})

ParagraphJson3Test.args = {
  paragraph: 'e153a016-f0ce-4e1c-8f70-d2216c8de26f',
}
ParagraphJson3Test.parameters = { chromatic: { disableSnapshot: true } }

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
