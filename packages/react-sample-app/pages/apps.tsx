import range from 'lodash/range'

import { faker } from '@faker-js/faker'
import { Escape, ListProps, Main } from '@fluent-blocks/react'

export default function Apps() {
  return (
    faker.seed(1234) && (
      <Main
        {...{
          title: 'Apps',
          abstract:
            'Select an app to see more information or update its configurations.',
          blocks: [
            {
              list: {
                caption: faker.fake('{{lorem.sentence}}'),
                captionVisuallyHidden: true,
                rowHeaderColumn: 'c1',
                rowsActivable: true,
                minWidthVariant: 'auto',
                maxWidthVariant: 'viewportWidth',
                columns: {
                  c1: {
                    title: 'Name',
                    minWidth: 120,
                  },
                  c2: {
                    title: 'Version number',
                    hideable: true,
                    hidePriority: 1,
                    minWidth: 60,
                  },
                  c3: {
                    title: 'App ID',
                    hideable: true,
                    hidePriority: 2,
                  },
                  c4: {
                    title: 'Updated',
                    hideable: true,
                    hidePriority: 3,
                  },
                },
                rows: range(32).reduce((acc: ListProps['list']['rows'], r) => {
                  acc[`nav:/apps/app-${r}`] = {
                    c1: { cell: faker.fake('{{lorem.words}}') },
                    c2: { cell: '1.0.0' },
                    c3: { cell: faker.fake('{{lorem.words}}') },
                    c4: { cell: faker.fake('4 {{date.month}} 2022') },
                  }
                  return acc
                }, {}),
              },
            },
          ],
        }}
      />
    )
  )
}
