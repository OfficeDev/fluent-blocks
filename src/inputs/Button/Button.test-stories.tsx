import { Button, ButtonProps } from './Button'
import { Parameters } from '@storybook/addons'

export default {
  title: 'Tests/Button',
  component: Button,
}

const ButtonTemplate = (props: ButtonProps) => <Button {...props} />

export const ButtonClickTest: typeof ButtonTemplate & {
  args?: ButtonProps
  parameters?: Parameters
} = ButtonTemplate.bind({})
ButtonClickTest.args = {
  type: 'button',
  actionId: '03cae49a-aaf5-4641-a652-6e633ffd1b75',
  label: 'ca227823-0eb2-42c4-a873-24a1c5068082',
  // eslint-disable-next-line no-console, no-restricted-globals
  onAction: (payload) => window.alert(payload.actionId),
}
ButtonClickTest.parameters = { chromatic: { disableSnapshot: true } }

export const ButtonPressTest: typeof ButtonTemplate & {
  args?: ButtonProps
  parameters?: Parameters
} = ButtonTemplate.bind({})
ButtonPressTest.args = {
  type: 'button',
  actionId: 'bb35aced-ab23-4eaa-96c0-48cb8800f58f',
  label: '1c525f9a-de85-4b35-8c23-658c625a2bf8',
  // eslint-disable-next-line no-console, no-restricted-globals
  onAction: (payload) => window.alert(payload.actionId),
}
ButtonPressTest.parameters = { chromatic: { disableSnapshot: true } }
