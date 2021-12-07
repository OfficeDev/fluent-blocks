import { BigMessage, BigMessageProps } from './BigMessage'
import { Text } from '../../inlines'
import { Escape } from '../../lib'
import { Parameters } from '@storybook/addons'
import { Illustration } from '../../media'

export default {
  title: 'Tests/BigMessage',
  component: BigMessage,
}

const BigMessageTemplate = (props: BigMessageProps) => <BigMessage {...props} />

export const BigMessageJsonTest: typeof BigMessageTemplate & {
  args?: BigMessageProps
  parameters?: Parameters
} = BigMessageTemplate.bind({})

BigMessageJsonTest.args = {
  message: {
    variant: 'big',
    title: [{ text: '9bd4bf8e-6747-440f-bba2-fe419a17bbc5' }],
    description: [{ text: '11d3f07b-e9a4-4186-bcbc-88f05f8c8b74' }],
    media: { illustration: 'hello' },
    actions: {
      primary: {
        actionId: 'c46cc54b-505b-4f17-9594-9eb019e2b507',
        label: '6598f3b6-42b1-48bf-89e9-5b4f497df4b9',
      },
      secondary: {
        actionId: '13717386-6cae-458e-838d-bb2542a0ccc6',
        label: 'ee1997e3-7947-45f9-b9dc-cef3b9622a9f',
      },
      tertiary: {
        actionId: '66a22eb8-29f8-490b-b4dc-916019e720f6',
        label: '5aa32db6-9968-4822-a88e-f8db12a9b0e6',
      },
    },
  },
}
BigMessageJsonTest.parameters = { chromatic: { disableSnapshot: true } }

export const BigMessageJsxTest: typeof BigMessageTemplate & {
  args?: BigMessageProps
  parameters?: Parameters
} = BigMessageTemplate.bind({})

BigMessageJsxTest.args = {
  message: {
    variant: 'big',
    title: [<Text key="t1" text={'13ec92f2-57b6-4e50-9e5b-eb3924f4da88'} />],
    description: [
      <Text key="t1" text={'24b5f53d-38d4-4895-b655-c79bbd74bc19'} />,
    ],
    media: <Illustration illustration="hello" />,
    // `actions` only accepts JSON since props are omitted/inferred
  },
}
BigMessageJsxTest.parameters = { chromatic: { disableSnapshot: true } }

export const BigMessageEscapeTest: typeof BigMessageTemplate & {
  args?: BigMessageProps
  parameters?: Parameters
} = BigMessageTemplate.bind({})

BigMessageEscapeTest.args = {
  message: {
    variant: 'big',
    title: [
      <Escape key="e1" contentMeetsAccessibilityAndDesignStandards>
        <span>ea3f02bc-b278-436e-b57a-9bfdba917bab</span>
      </Escape>,
    ],
    description: [
      <Escape key="e1" contentMeetsAccessibilityAndDesignStandards>
        <span>c9ed0a93-3488-484b-bc18-6da5aa378f74</span>
      </Escape>,
    ],
    media: (
      <Escape contentMeetsAccessibilityAndDesignStandards>
        <span>ab4a937c-c7e1-4be3-9dcf-2cb6d9685c0a</span>
      </Escape>
    ),
    actions: (
      <Escape contentMeetsAccessibilityAndDesignStandards>
        <span>e4612e68-b851-47d6-8fc8-8694c00e591b</span>
      </Escape>
    ),
  },
}
BigMessageEscapeTest.parameters = { chromatic: { disableSnapshot: true } }
