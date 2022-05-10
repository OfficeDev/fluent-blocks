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

// 1f762d1e-dc9f-47ae-a17c-0eca864f155f
// eb1eaa17-5140-4b81-a19c-4b48d567e109
// 4fd856d2-79e0-451c-b8c9-8e0355552ba3
// d71fb4f0-0f69-42b1-8636-baaea35338d8
// 710fb62a-99a0-4a31-8233-dde2149e9324
// 0ec19628-108d-4834-937d-2a941599dc19
// fb9490af-ee5e-47f1-9af9-1598ac3c259c
// 3cbf454c-6db3-4a92-b417-a2651122dd0b
// 6d68c35c-07cc-45ef-b16a-45ffd8ae1103
// c6fd179d-0fbe-4122-af28-9e5a41f87c65
// b55ed27a-780e-48c8-81e0-7d84dc169394
// b60f9fbb-6e78-406d-af4c-5d77af86da82
// 2293a663-3903-447b-bc63-425b295f8ddb
// f708cb48-1691-4cbd-84bd-e668aa611c6d
// 7f7640f9-071a-42e1-abd0-af8ad2c1bd1e
// 2398797c-91e0-4cda-93dc-b03251acb0b8
// 6d8bf59a-83b0-459c-8ab8-17d5995c2b07
// e082fb42-c7aa-400b-8d31-d320e2222851
// d2b070be-e8a6-4f30-b036-7f6968e2c7ff
// 7b202325-7e3d-4099-b3cf-29fef2098929
// 85fb0f78-421a-43a3-b079-385aa3eef45e
// fa3f3505-445f-4b86-9c6e-08d6fcba027a
// 1847f2b9-023f-4f06-a808-b47937396769
// 9431bd8f-9241-4385-8f87-ca26e477cf1b

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
