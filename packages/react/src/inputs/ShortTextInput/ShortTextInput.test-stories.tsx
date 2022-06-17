import { SingleValueInputActionPayload } from '@fluent-blocks/schemas'
import { Parameters } from '@storybook/addons'

import { FluentBlocksProvider } from '../../lib'
import { ActionHandler } from '../../props'
import { ShortTextInput, ShortTextInputProps } from './ShortTextInput'

export default {
  title: 'Tests/Shorttextinput',
  component: ShortTextInput,
}

type ShortTextInputTestArgs = {
  textInput: ShortTextInputProps['textInput']
  onAction?: ActionHandler<SingleValueInputActionPayload>
}

const ShortTextInputTemplate = ({
  textInput,
  onAction,
}: ShortTextInputTestArgs) => (
  <FluentBlocksProvider onAction={onAction}>
    <ShortTextInput textInput={textInput} />
  </FluentBlocksProvider>
)

export const ShorttextinputChangeTest: typeof ShortTextInputTemplate & {
  args?: ShortTextInputTestArgs
  parameters?: Parameters
} = ShortTextInputTemplate.bind({})

ShorttextinputChangeTest.args = {
  textInput: {
    inputType: 'text',
    actionId: '3c4333b6-42e5-4242-8c49-8ee58e3097f9',
    label: '6cc06231-d31d-461f-96ea-83ef18a4bccb',
    onAction: (payload: SingleValueInputActionPayload) =>
      document.defaultView?.alert(`${payload.actionId}::${payload.value}`),
  },
}
ShorttextinputChangeTest.parameters = { chromatic: { disableSnapshot: true } }
