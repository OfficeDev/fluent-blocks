import { Parameters } from '@storybook/addons'

import { TableProps } from '../../props'
import { Table } from './Table'

export default {
  title: 'Tests/Table',
  component: Table,
}

const TableTemplate = (props: TableProps) => <Table {...props} />

export const TableJsonTest: typeof TableTemplate & {
  args?: TableProps
  parameters?: Parameters
} = TableTemplate.bind({})

TableJsonTest.args = {
  table: {
    caption: '7151084f-3323-408a-be7e-c96387020bfe',
    rowHeaderColumn: 'af8724f0-1ae7-431f-be7f-b35a276284e3',
    columns: {
      'af8724f0-1ae7-431f-be7f-b35a276284e3': {
        title: '8f296c70-0eac-4f1f-aa9c-2d3fcbca64f6',
      },
      'e36a52fd-b274-4820-8448-f51888e97fb3': {
        title: 'bf09289d-5b51-4d4f-ba10-ec36accf8b65',
      },
    },
    rows: {
      'a326a593-e247-4601-8f83-839cec59bfda': {
        'af8724f0-1ae7-431f-be7f-b35a276284e3': {
          cell: '1cb6d758-e3f0-4e10-8579-dbd348e680fd',
        },
        'e36a52fd-b274-4820-8448-f51888e97fb3': {
          cell: '378a3894-aad0-4375-858d-86981205396b',
        },
      },
      'da2880c0-87b4-49c9-ba5a-bcda0466991f': {
        'af8724f0-1ae7-431f-be7f-b35a276284e3': {
          cell: '33c4f7b2-f6fd-4830-bf1d-47b4525ed2f7',
        },
        'e36a52fd-b274-4820-8448-f51888e97fb3': {
          cell: '32fd4f47-7f31-4ffe-a676-563b0642a79a',
        },
      },
    },
  },
}
TableJsonTest.parameters = { chromatic: { disableSnapshot: true } }
