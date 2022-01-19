import { Chart, ChartProps } from './Chart'
import { Parameters } from '@storybook/addons'

export default {
  title: 'Tests/Chart',
  component: Chart,
}

const ChartTemplate = (props: ChartProps) => <Chart {...props} />

export const ChartJsonTest: typeof ChartTemplate & {
  args?: ChartProps
  parameters?: Parameters
} = ChartTemplate.bind({})

ChartJsonTest.args = {
  label: 'cd324e65-8fed-4c66-a846-e13aeb52f977',
  chart: {
    type: 'bar',
    data: {
      labels: ['3413', '7f94', 'e25d', '25c5', 'a445'],
      datasets: [
        {
          label: 'cc90',
          data: [1860, 7700, 4100, 3012, 2930],
        },
        {
          label: 'f8dc',
          data: [1200, 3600, 2480, 5049, 4596],
        },
      ],
    },
  },
}
ChartJsonTest.parameters = { chromatic: { disableSnapshot: true } }

// Note: charting components don’t support a JSX syntax, thus can’t support
// `Escape` ether. See the README.md in this directory for more info.
