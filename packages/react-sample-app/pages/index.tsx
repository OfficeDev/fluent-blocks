import range from 'lodash/range'

import { Main } from '@fluent-blocks/react'

export default function Home() {
  return (
    <Main
      {...{
        title: '',
        blocks: [
          {
            dashboard: {
              variant: 'grid',
              items: [
                {
                  item: {
                    widget: {
                      label: 'Hello',
                      title: 'Hello welcome to developer portal',
                      tabs: [
                        {
                          tab: { label: 'Hello' },
                          panel: [
                            {
                              inputs: [
                                {
                                  button: {
                                    actionId: 'nav:/apps',
                                    label: 'Get started ›',
                                    variant: 'primary',
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  },
                  inlineSizeFactor: 2,
                  blockSizeFactor: 2,
                },
                ...range(12).map((i) => ({
                  item: {
                    widget: {
                      label: `Card ${i}`,
                      title: `Card ${i}`,
                      tabs: [
                        {
                          tab: { label: 'Card' },
                          panel: [{ paragraph: 'Content' }],
                        },
                      ],
                    },
                  },
                })),
              ],
            },
          },
        ],
      }}
    />
  )
}
