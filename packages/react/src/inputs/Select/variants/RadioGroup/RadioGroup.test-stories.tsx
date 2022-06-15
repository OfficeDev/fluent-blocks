import { SingleValueInputActionPayload } from '@fluent-blocks/schemas'
import { Parameters } from '@storybook/addons'

import { FluentBlocksProvider } from '../../../../lib'
import { ActionHandler } from '../../../../props'
import { Select } from '../../Select'
import { RadioGroupProps } from './RadioGroup'

export default {
  title: 'Tests/Radiogroup',
  component: Select,
}

type RadioGroupTestArgs = {
  select: RadioGroupProps['select']
  onAction?: ActionHandler<SingleValueInputActionPayload>
}

const RadioGroupTemplate = ({ select, onAction }: RadioGroupTestArgs) => (
  <FluentBlocksProvider onAction={onAction}>
    <Select select={select} />
  </FluentBlocksProvider>
)

export const RadiogroupChangeTest: typeof RadioGroupTemplate & {
  args?: RadioGroupTestArgs
  parameters?: Parameters
} = RadioGroupTemplate.bind({})

RadiogroupChangeTest.args = {
  select: {
    variant: 'group',
    multiple: false,
    actionId: '8fafabd0-5bcb-4f04-b5ef-36fb5de07ba7',
    label: '93f7fbbd-88ad-4162-bf75-dad77ab880ef',
    options: [
      {
        value: 'a179b0c9-dbb5-419c-8879-8bfc1f5bf6c3',
        label: '842f3b8e-cb53-433b-a09f-859d06c52417',
      },
      {
        value: 'b1fff5a0-413b-4ae9-8912-7381a277233b',
        label: '08267ba2-bfa4-4117-9c62-ffd4fc0ad46c',
      },
    ],
    onAction: (payload: SingleValueInputActionPayload) =>
      document.defaultView?.alert(`${payload.actionId}::${payload.value}`),
  },
}
RadiogroupChangeTest.parameters = { chromatic: { disableSnapshot: true } }
