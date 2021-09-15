import { View } from './View'
import range from 'lodash/range'
import { View as ViewProps } from '../../types/view'
import { fake } from 'faker/locale/en_US'

const fakeTitle = () => {
  const lowercase = fake('{{lorem.words}}')
  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1)
}

const defaultMain = {
  title: [{ text: 'Fluent Kit' }],
  abstract: [{ text: 'This is a demonstration of Fluent Kit’s View component. ' }, { text: fake('{{lorem.paragraph}}') }],
  sections: range(4).map(() => ({
    title: [{ text: fakeTitle() }],
    blocks: range(3).map(() => ({ paragraph: range(3).map(() => ({ text: fake('{{lorem.sentence}} ') })) })),
  })),
}

export default {
  title: 'View',
  component: View,
  argTypes: {
    main: {
      name: 'Main',
      defaultValue: defaultMain,
      control: { type: 'object' },
    },
  },
}

export const ViewDemo = (view: ViewProps) => <View {...view} />
