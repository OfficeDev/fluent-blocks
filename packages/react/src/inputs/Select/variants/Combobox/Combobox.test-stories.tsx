import { MultipleValueInputActionPayload } from '@fluent-blocks/schemas'
import { Parameters } from '@storybook/addons'

import { FluentBlocksProvider } from '../../../../lib'
import { ActionHandler } from '../../../../props'
import { Select } from '../../Select'
import { ComboboxProps } from './Combobox'

export default {
  title: 'Tests/Combobox',
  component: Select,
}

type ComboboxTestArgs = {
  select: ComboboxProps['select']
  onAction?: ActionHandler<MultipleValueInputActionPayload>
}

const ComboboxTemplate = ({ select, onAction }: ComboboxTestArgs) => (
  <FluentBlocksProvider onAction={onAction}>
    <Select select={select} />
  </FluentBlocksProvider>
)

export const ComboboxChangeTest: typeof ComboboxTemplate & {
  args?: ComboboxTestArgs
  parameters?: Parameters
} = ComboboxTemplate.bind({})

ComboboxChangeTest.args = {
  select: {
    variant: 'combobox',
    multiple: true,
    actionId: '6f72b1df-7e3e-4825-ae1b-200bd136a69f',
    label: 'd421181d-fd2c-442e-a500-0750e768c53f',
    options: [
      {
        value: 'e44accde-e3ab-4080-a3de-109431277fe6',
        label: '5be63cf8-4942-4c0c-a535-6fa9cdbb03b0',
      },
      {
        value: 'b7a63920-a6fe-4c46-85fe-aa98b8e9dbd6',
        label: '9e7a193d-c6cb-4d53-9a26-e5abc4030e32',
      },
    ],
    placeholder: '46e6187f-2385-4388-a161-0c6bcc47f9d0',
    onAction: (payload: MultipleValueInputActionPayload) => {
      document.defaultView?.alert(
        `${payload.actionId}::${payload.values.join(':')}`
      )
    },
  },
}
ComboboxChangeTest.parameters = { chromatic: { disableSnapshot: true } }
