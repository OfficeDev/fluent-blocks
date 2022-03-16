import { Toolbar, ToolbarProps } from './Toolbar'
import { Parameters } from '@storybook/addons'

export default {
  title: 'Tests/Toolbar',
  component: Toolbar,
}

const DescriptionListTemplate = (props: ToolbarProps) => <Toolbar {...props} />

export const ToolbarJsonTest: typeof DescriptionListTemplate & {
  args?: ToolbarProps
  parameters?: Parameters
} = DescriptionListTemplate.bind({})

ToolbarJsonTest.args = {
  toolbar: {
    items: [
      {
        type: 'action',
        actionId: '51e6eeb9',
        label: '51e6eeb9',
        iconOnly: true,
        icon: 'text_font',
      },
      {
        type: 'action',
        actionId: '5df2271b',
        label: '5df2271b',
        iconOnly: true,
        icon: 'code',
      },
      {
        type: 'action',
        actionId: 'f3f2f8b3',
        label: 'f3f2f8b3',
        iconOnly: true,
        icon: 'fax',
      },
      {
        type: 'action',
        actionId: '936a8367',
        label: '936a8367',
        iconOnly: false,
        icon: 'stack',
      },
      {
        type: 'action',
        actionId: '8b6f57ce',
        label: '8b6f57ce',
        iconOnly: false,
        icon: 'paint_bucket',
      },
      {
        type: 'action',
        actionId: '4570ae4a',
        label: '4570ae4a',
        iconOnly: false,
        icon: 'accessibility',
      },
      {
        type: 'action',
        actionId: '7d5e0458',
        label: '7d5e0458',
      },
      {
        type: 'action',
        actionId: 'bde46a16',
        label: 'bde46a16',
        iconOnly: true,
        icon: 'target_arrow',
      },
      {
        type: 'action',
        actionId: '2720bb7b',
        label: '2720bb7b',
        iconOnly: true,
        icon: 'animal_cat',
      },
      {
        type: 'action',
        actionId: '47651057',
        label: '47651057',
        iconOnly: false,
        icon: 'clock',
      },
      {
        type: 'action',
        actionId: '466e4dca',
        label: '466e4dca',
        iconOnly: false,
        icon: 'send',
      },
      {
        type: 'action',
        actionId: 'b3ccb472',
        label: 'b3ccb472',
        iconOnly: false,
        icon: 'text_quote',
      },
    ],
  },
}
ToolbarJsonTest.parameters = { chromatic: { disableSnapshot: true } }
