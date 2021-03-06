import { Heading, HeadingProps } from './Heading'
import { Text } from '../../inlines'
import { Escape } from '../../lib'
import { Parameters } from '@storybook/addons'

export default {
  title: 'Tests/Heading',
  component: Heading,
}

const HeadingTemplate = (props: HeadingProps) => <Heading {...props} />

export const HeadingJsonTest: typeof HeadingTemplate & {
  args?: HeadingProps
  parameters?: Parameters
} = HeadingTemplate.bind({})

HeadingJsonTest.args = {
  level: 1,
  paragraph: [{ text: 'a2c49d93-b303-48e9-a623-bb97b601e8f3' }],
}
HeadingJsonTest.parameters = { chromatic: { disableSnapshot: true } }

export const HeadingJsxTest: typeof HeadingTemplate & {
  args?: HeadingProps
  parameters?: Parameters
} = HeadingTemplate.bind({})

HeadingJsxTest.args = {
  level: 2,
  paragraph: [<Text text="cf22cf49-06d9-400d-8ae8-c086059bf8f7" key="t1" />],
}
HeadingJsxTest.parameters = { chromatic: { disableSnapshot: true } }

export const HeadingEscapeTest: typeof HeadingTemplate & {
  args?: HeadingProps
  parameters?: Parameters
} = HeadingTemplate.bind({})

HeadingEscapeTest.args = {
  level: 3,
  paragraph: [
    <Escape contentMeetsAccessibilityAndDesignStandards={true} key="t1">
      <span>21b6d9a7-4941-458f-b69a-fc5ec4bdd9d0</span>
    </Escape>,
  ],
}
HeadingEscapeTest.parameters = { chromatic: { disableSnapshot: true } }
