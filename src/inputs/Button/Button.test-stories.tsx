import { Button, ButtonProps } from './Button'
import { Parameters } from '@storybook/addons'

export default {
  title: 'Tests/Button',
  component: Button,
}

type ButtonTestArgs = { b1: ButtonProps; b2: ButtonProps }

const ButtonTemplate = ({ b1, b2 }: ButtonTestArgs) => (
  <>
    <Button {...b1} />
    <Button {...b2} />
  </>
)

export const ButtonTest: typeof ButtonTemplate & {
  args?: ButtonTestArgs
  parameters?: Parameters
} = ButtonTemplate.bind({})

ButtonTest.args = {
  b1: {
    type: 'button',
    actionId: '03cae49a-aaf5-4641-a652-6e633ffd1b75',
    label: 'ca227823-0eb2-42c4-a873-24a1c5068082',
    // eslint-disable-next-line no-console, no-restricted-globals
    onAction: (payload) => window.alert(payload.actionId),
  },
  b2: {
    type: 'button',
    actionId: 'bb35aced-ab23-4eaa-96c0-48cb8800f58f',
    label: '1c525f9a-de85-4b35-8c23-658c625a2bf8',
    // eslint-disable-next-line no-console, no-restricted-globals
    onAction: (payload) => window.alert(payload.actionId),
  },
}
ButtonTest.parameters = { chromatic: { disableSnapshot: true } }
