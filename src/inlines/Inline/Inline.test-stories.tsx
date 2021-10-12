import { Inline, InlineEntity, InlineSequence } from './Inline'
import { Escape, Sequence } from '../../lib'
import { Text } from '../Text/Text'
import { Icon } from '../Icon/Icon'

export default {
  title: 'Tests/Inline',
  component: Inline,
}

type InlineSequenceArgs = { inlines: InlineSequence }

const InlineTemplate = ({ inlines }: InlineSequenceArgs) =>
  Sequence<InlineEntity>(inlines, Inline)

export const InlineJsonTest: typeof InlineTemplate & {
  args?: InlineSequenceArgs
} = InlineTemplate.bind({})

InlineJsonTest.args = {
  inlines: [
    { text: 'd0192c39-f601-40fa-a174-1b68d87c50ee' },
    { icon: '313be9f9-1c3b-4cf8-adb4-5dc59d4197a3' },
  ],
}

export const InlineJsxTest: typeof InlineTemplate & {
  args?: InlineSequenceArgs
} = InlineTemplate.bind({})

InlineJsxTest.args = {
  inlines: [
    <Text text="335e225e-b295-4995-8dc4-dfe9d0eed3e8" key="t1" />,
    <Icon icon="3e6f7b4e-9d9c-4c4a-85fe-4e36e558b052" key="t2" />,
  ],
}

export const InlineEscapeTest: typeof InlineTemplate & {
  args?: InlineSequenceArgs
} = InlineTemplate.bind({})

InlineEscapeTest.args = {
  inlines: [
    <Escape contentMeetsAccessibilityAndDesignStandards key="t1">
      <span>12d046a8-1649-4d84-b240-35c7c0ee7a91</span>
    </Escape>,
  ],
}
