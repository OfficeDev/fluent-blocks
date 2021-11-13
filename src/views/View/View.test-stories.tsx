import { View, ViewProps } from './View'
import { Parameters } from '@storybook/addons'

export default {
  title: 'Tests/View',
  component: View,
}

const ViewTemplate = (props: ViewProps) => <View {...props} />

export const ViewOnActionTest: typeof ViewTemplate & {
  args?: ViewProps
  parameters?: Parameters
} = ViewTemplate.bind({})

ViewOnActionTest.args = {
  main: {
    title: [{ text: 'Tests/View' }],
    blocks: [
      {
        message: {
          variant: 'big',
          title: [{ text: 'Big message' }],
          actions: {
            primary: {
              label: '0094cea7-6ab5-43be-8975-eb4952d5fd60',
              actionId: 'ff92e203-0767-4bcd-a483-df5e7857a5bb',
            },
          },
        },
      },
    ],
  },
  // eslint-disable-next-line no-restricted-globals
  onAction: (payload) => window.alert(payload.actionId),
}
ViewOnActionTest.parameters = { chromatic: { disableSnapshot: true } }
