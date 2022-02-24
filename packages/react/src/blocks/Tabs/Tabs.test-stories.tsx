import { Tabs, TabsProps } from './Tabs'
import { Escape } from '../../lib'
import { Parameters } from '@storybook/addons'
import { Paragraph } from '../Paragraph/Paragraph'

export default {
  title: 'Tests/Tabs',
  component: Tabs,
}

const TabsTemplate = (props: TabsProps) => <Tabs {...props} />

export const TabsJsonTest: typeof TabsTemplate & {
  args?: TabsProps
  parameters?: Parameters
} = TabsTemplate.bind({})

TabsJsonTest.args = {
  label: '233277a1-f1da-405a-8f39-369b7519b0ee',
  tabs: [
    {
      tab: { label: '82564647-4a86-4f7e-800c-0b65dba46866' },
      panel: [
        {
          paragraph: 'af0cc026-7a92-4922-8386-ad563019a77a',
        },
      ],
    },
  ],
}
TabsJsonTest.parameters = { chromatic: { disableSnapshot: true } }

export const TabsJsxTest: typeof TabsTemplate & {
  args?: TabsProps
  parameters?: Parameters
} = TabsTemplate.bind({})

TabsJsxTest.args = {
  label: '8fda3bd1-0f5c-4ac0-ab17-f58a09216c59',
  tabs: [
    {
      tab: { label: 'b520d24b-6bbe-41ee-9dc7-3d545a74252e' },
      panel: [
        <Paragraph
          paragraph={'a5ebd0ef-4a35-47a5-a395-8930fdab7faa'}
          key="k1"
        />,
      ],
    },
  ],
}
TabsJsxTest.parameters = { chromatic: { disableSnapshot: true } }

export const TabsEscapeTest: typeof TabsTemplate & {
  args?: TabsProps
  parameters?: Parameters
} = TabsTemplate.bind({})

TabsEscapeTest.args = {
  label: '52738fcb-6aee-4fed-87de-85400ad80364',
  tabs: [
    {
      tab: { label: 'e38732c2-6006-4053-8473-0bfda72a2a4f' },
      panel: [
        <Escape contentMeetsAccessibilityAndDesignStandards key="k1">
          <span>0547fd7b-7ba7-4d32-8830-b3212de9d496</span>
        </Escape>,
      ],
    },
  ],
}
TabsEscapeTest.parameters = { chromatic: { disableSnapshot: true } }
