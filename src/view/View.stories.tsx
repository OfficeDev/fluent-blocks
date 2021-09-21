import { View } from './View'
import range from 'lodash/range'
import { View as ViewProps } from '../../types/view'
import { fake } from 'faker/locale/en_US'

const fakeTitle = () => {
  const lowercase = fake('{{lorem.words}}')
  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1)
}

export default {
  title: 'View',
  component: View,
  argTypes: {
    main: {
      name: 'Main',
      control: { type: 'object' },
    },
    dir: {
      name: 'Text direction',
      control: { type: 'inline-radio', labels: { ltr: '→', rtl: '←' } },
    },
    theme: {
      name: 'Theme variant',
      control: {
        type: 'inline-radio',
        labels: {
          light: 'Light',
          dark: 'Dark',
          'high-contrast': 'High contrast',
        },
      },
    },
  },
}

const ViewTemplate = (props: ViewProps) => <View {...props} />

export const ViewDemo = ViewTemplate.bind({})
ViewDemo.args = {
  main: {
    title: [{ text: 'Fluent Kit' }],
    abstract: [
      { text: 'This is a demonstration of Fluent Kit’s View component. ' },
      { text: fake('{{lorem.paragraph}}') },
    ],
    sections: range(4).map((s) => ({
      title: [{ text: fakeTitle() }],
      blocks: range(3).map(() => ({
        paragraph: range(3).map(() => ({ text: fake('{{lorem.sentence}} ') })),
      })),
      ...(s === 1 && {
        blocks: [
          {
            inputs: [
              { label: fake(fakeTitle()) },
              { label: fake(fakeTitle()) },
              { label: fake(fakeTitle()) },
            ],
          },
        ],
        sections: range(2).map(() => ({
          title: [{ text: fakeTitle() }],
          blocks: range(3).map(() => ({
            paragraph: range(3).map(() => ({
              text: fake('{{lorem.sentence}} '),
            })),
          })),
        })),
      }),
    })),
  },
  dir: 'ltr',
  theme: 'light',
} as ViewProps
