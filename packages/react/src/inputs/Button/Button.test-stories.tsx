import { Parameters } from '@storybook/addons'

import { FluentBlocksProvider } from '../../lib'
import { ActionHandler } from '../../props'
import { Button, ButtonActionPayload, ButtonProps } from './Button'

export default {
  title: 'Tests/Button',
  component: Button,
}

type ButtonTestArgs = {
  button: ButtonProps['button']
  onAction?: ActionHandler<ButtonActionPayload>
}

const ButtonTemplate = ({ button, onAction }: ButtonTestArgs) => (
  <FluentBlocksProvider onAction={onAction}>
    <Button button={button} />
  </FluentBlocksProvider>
)

export const ButtonClickTest: typeof ButtonTemplate & {
  args?: ButtonTestArgs
  parameters?: Parameters
} = ButtonTemplate.bind({})

ButtonClickTest.args = {
  button: {
    actionId: '03cae49a-aaf5-4641-a652-6e633ffd1b75',
    label: 'ca227823-0eb2-42c4-a873-24a1c5068082',
    onAction: (payload: ButtonActionPayload) =>
      document.defaultView?.alert(payload.actionId),
  },
}
ButtonClickTest.parameters = { chromatic: { disableSnapshot: true } }
