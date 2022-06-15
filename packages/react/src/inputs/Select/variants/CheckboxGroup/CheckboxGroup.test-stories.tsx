import { MultipleValueInputActionPayload } from '@fluent-blocks/schemas'
import { Parameters } from '@storybook/addons'

import { FluentBlocksProvider } from '../../../../lib'
import { ActionHandler } from '../../../../props'
import { Select } from '../../Select'
import { CheckboxGroupProps } from './CheckboxGroup'

export default {
  title: 'Tests/Checkboxgroup',
  component: Select,
}

type CheckboxGroupTestArgs = {
  select: CheckboxGroupProps['select']
  onAction?: ActionHandler<MultipleValueInputActionPayload>
}

const CheckboxGroupTemplate = ({ select, onAction }: CheckboxGroupTestArgs) => (
  <FluentBlocksProvider onAction={onAction}>
    <Select select={select} />
  </FluentBlocksProvider>
)

export const CheckboxgroupChangeTest: typeof CheckboxGroupTemplate & {
  args?: CheckboxGroupTestArgs
  parameters?: Parameters
} = CheckboxGroupTemplate.bind({})

CheckboxgroupChangeTest.args = {
  select: {
    variant: 'group',
    multiple: true,
    actionId: '62d0da32-ef0f-4976-b387-35a0861c2fd3',
    label: '0d3933f0-e598-47d9-93d8-3a3a8062fc45',
    options: [
      {
        value: 'f15bf8e1-77a6-4a35-9f70-ad4f6c9fc4aa',
        label: '63e1ec6e-e3c5-4f19-9d28-383ec5b46963',
      },
      {
        value: '05060238-06a9-4ce5-ba39-01d90eb7f16d',
        label: '8973188a-c74b-4d83-b8c2-675811f9a869',
      },
    ],
    onAction: (payload: MultipleValueInputActionPayload) =>
      document.defaultView?.alert(
        `${payload.actionId}::${payload.values.join(',')}`
      ),
  },
}
CheckboxgroupChangeTest.parameters = { chromatic: { disableSnapshot: true } }
