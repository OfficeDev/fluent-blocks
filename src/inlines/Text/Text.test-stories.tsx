import { Text, TextProps } from './Text'

export default {
  title: 'Tests/Text',
  component: Text,
}

const TextTemplate = (props: TextProps) => <Text {...props} />

export const TextTest: typeof TextTemplate & {
  args?: TextProps
} = TextTemplate.bind({})

TextTest.args = {
  text: '4270bec2-4a76-4e13-899e-70115e1bf49e',
}
