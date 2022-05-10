import { Parameters } from '@storybook/addons'

import { List, ListProps } from './List'

export default {
  title: 'Tests/List',
  component: List,
}

const ListTemplate = (props: ListProps) => <List {...props} />

export const ListJsonTest: typeof ListTemplate & {
  args?: ListProps
  parameters?: Parameters
} = ListTemplate.bind({})

ListJsonTest.args = {
  list: {
    caption: '1f762d1e-dc9f-47ae-a17c-0eca864f155f',
    rowHeaderColumn: 'eb1eaa17-5140-4b81-a19c-4b48d567e109',
    columns: {
      'eb1eaa17-5140-4b81-a19c-4b48d567e109': {
        title: '4fd856d2-79e0-451c-b8c9-8e0355552ba3',
      },
      'd71fb4f0-0f69-42b1-8636-baaea35338d8': {
        title: '710fb62a-99a0-4a31-8233-dde2149e9324',
      },
    },
    rows: {
      '9431bd8f-9241-4385-8f87-ca26e477cf1b': {
        'eb1eaa17-5140-4b81-a19c-4b48d567e109': {
          cell: '0ec19628-108d-4834-937d-2a941599dc19',
        },
        'd71fb4f0-0f69-42b1-8636-baaea35338d8': {
          cell: 'fb9490af-ee5e-47f1-9af9-1598ac3c259c',
        },
      },
      '1847f2b9-023f-4f06-a808-b47937396769': {
        'eb1eaa17-5140-4b81-a19c-4b48d567e109': {
          cell: '3cbf454c-6db3-4a92-b417-a2651122dd0b',
        },
        'd71fb4f0-0f69-42b1-8636-baaea35338d8': {
          cell: '6d68c35c-07cc-45ef-b16a-45ffd8ae1103',
        },
      },
    },
  },
}
ListJsonTest.parameters = { chromatic: { disableSnapshot: true } }
