import { Parameters } from '@storybook/addons'

import { ShortInputs, ShortInputsProps } from './ShortInputs'

export default {
  title: 'Tests/Sis',
  component: ShortInputs,
}

const ShortInputsTemplate = (props: ShortInputsProps) => (
  <ShortInputs {...props} />
)

export const ShortInputsJsonTest: typeof ShortInputsTemplate & {
  args?: ShortInputsProps
  parameters?: Parameters
} = ShortInputsTemplate.bind({})

ShortInputsJsonTest.args = {
  inputs: [
    {
      button: {
        label: '37db439e-ea0f-44b6-8fbe-61138ad48601',
        actionId: '034919a8-d48e-4707-82c2-26b02c4348ba',
      },
    },
  ],
}
ShortInputsJsonTest.parameters = { chromatic: { disableSnapshot: true } }
