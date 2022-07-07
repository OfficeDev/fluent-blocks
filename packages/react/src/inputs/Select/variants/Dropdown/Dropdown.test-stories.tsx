import { SingleValueInputActionPayload } from '@fluent-blocks/schemas'
import { Parameters } from '@storybook/addons'

import { FluentBlocksProvider } from '../../../../lib'
import { ActionHandler } from '../../../../props'
import { Select } from '../../Select'
import { DropdownProps } from './Dropdown'

export default {
  title: 'Tests/Dropdown',
  component: Select,
}

type DropdownTestArgs = {
  select: DropdownProps['select']
  onAction?: ActionHandler<SingleValueInputActionPayload>
}

const DropdownTemplate = ({ select, onAction }: DropdownTestArgs) => (
  <FluentBlocksProvider onAction={onAction}>
    <Select select={select} />
  </FluentBlocksProvider>
)

export const DropdownChangeTest: typeof DropdownTemplate & {
  args?: DropdownTestArgs
  parameters?: Parameters
} = DropdownTemplate.bind({})

DropdownChangeTest.args = {
  select: {
    variant: 'combobox',
    multiple: false,
    actionId: '5cfc6dda-d0be-4a17-8284-7514817d934c',
    label: 'ea6fa074-371b-4c4c-8b50-d51e2ae953f3',
    options: [
      {
        value: '6eef5d6e-ceaf-418f-8a73-478ead53da1b',
        label: '9887015f-f3ea-49f1-a9ec-808e1fa7b62d',
      },
      {
        value: '66d2bb99-27da-4c64-ae8d-9256665e4329',
        label: '57417f23-1a74-4c95-839b-74e47648d36c',
      },
    ],
    placeholder: '04fb46ac-bb7c-4622-9c6c-35dae242b271',
    onAction: (payload: SingleValueInputActionPayload) =>
      document.defaultView?.alert(`${payload.actionId}::${payload.value}`),
  },
}
DropdownChangeTest.parameters = { chromatic: { disableSnapshot: true } }
