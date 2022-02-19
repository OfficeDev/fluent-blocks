import { DescriptionList, DescriptionListProps } from './DescriptionList'
import { Parameters } from '@storybook/addons'

export default {
  title: 'Tests/Dl',
  component: DescriptionList,
}

const DescriptionListTemplate = (props: DescriptionListProps) => (
  <DescriptionList {...props} />
)

export const DlJsonTest: typeof DescriptionListTemplate & {
  args?: DescriptionListProps
  parameters?: Parameters
} = DescriptionListTemplate.bind({})

DlJsonTest.args = {
  descriptionList: [
    {
      title: '84f20521-7e72-4c2a-8782-f931709653c3',
      description: '3c15cfbd-1fc0-4b6d-8334-59f94e5b4886',
    },
  ],
}
DlJsonTest.parameters = { chromatic: { disableSnapshot: true } }
