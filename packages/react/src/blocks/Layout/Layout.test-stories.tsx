import { Parameters } from '@storybook/addons'

import { Escape } from '../../lib'
import { LayoutProps } from '../../props/layout-properties'
import { Paragraph } from '../Paragraph/Paragraph'
import { Layout } from './Layout'

export default {
  title: 'Tests/Layout',
  component: Layout,
}

const LayoutTemplate = (props: LayoutProps) => <Layout {...props} />

export const LayoutJsonTest: typeof LayoutTemplate & {
  args?: LayoutProps
  parameters?: Parameters
} = LayoutTemplate.bind({})

LayoutJsonTest.args = {
  layout: {
    variant: 'grid',
    items: [
      {
        item: { card: [{ paragraph: '7ff644a3-eb27-4e97-8978-5d7b3d569388' }] },
      },
    ],
  },
}
LayoutJsonTest.parameters = { chromatic: { disableSnapshot: true } }
