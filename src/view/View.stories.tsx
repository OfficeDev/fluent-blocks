import range from 'lodash/range'
import { fake } from 'faker/locale/en_US'
import { View, ViewProps } from './View'

const fakeTitle = () => {
  const lowercase = fake('{{lorem.words}}')
  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1)
}

export default {
  title: 'Patterns/View',
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

export const ViewDemo: typeof ViewTemplate & { args?: ViewProps } =
  ViewTemplate.bind({})
ViewDemo.args = {
  main: {
    title: [{ text: 'Fluent React Patterns' }],
    abstract: [
      {
        text: 'This is a demonstration of Fluent React Patterns’ View component. ',
      },
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
              { label: [{ text: fake(fakeTitle()) }] },
              { label: [{ text: fake(fakeTitle()) }] },
              { label: [{ text: fake(fakeTitle()) }] },
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
}
