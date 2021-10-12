import { Block, BlockEntity, BlockSequence } from './Block'
import { Escape, Sequence } from '../../lib'
import { Figure } from '../Figure/Figure'
import { Paragraph } from '../Paragraph/Paragraph'
import { Parameters } from '@storybook/addons'

export default {
  title: 'Tests/Block',
  component: Block,
}

type BlockSequenceArgs = { blocks: BlockSequence }

const BlockTemplate = ({ blocks }: BlockSequenceArgs) =>
  Sequence<BlockEntity>(blocks, Block)

export const BlockJsonTest: typeof BlockTemplate & {
  args?: BlockSequenceArgs
  parameters?: Parameters
} = BlockTemplate.bind({})

BlockJsonTest.args = {
  blocks: [
    { caption: [{ text: '8efae607-15cd-4294-a71b-c585ca28278f' }] },
    { paragraph: [{ text: '3b517894-57f8-4ed2-824b-90285b4686ce' }] },
  ],
}
BlockJsonTest.parameters = { chromatic: { disableSnapshot: true } }

export const BlockJsxTest: typeof BlockTemplate & {
  args?: BlockSequenceArgs
  parameters?: Parameters
} = BlockTemplate.bind({})

BlockJsxTest.args = {
  blocks: [
    <Figure
      caption={[{ text: '2bc0f585-7129-41be-aa66-ab8fd24372bc' }]}
      key="t1"
    />,
    <Paragraph
      paragraph={[{ text: '76cbfb72-0703-4cc0-8b39-a733d6f34b4b' }]}
      key="t2"
    />,
  ],
}
BlockJsxTest.parameters = { chromatic: { disableSnapshot: true } }

export const BlockEscapeTest: typeof BlockTemplate & {
  args?: BlockSequenceArgs
  parameters?: Parameters
} = BlockTemplate.bind({})

BlockEscapeTest.args = {
  blocks: [
    <Escape contentMeetsAccessibilityAndDesignStandards key="t1">
      <span>2fe399c7-c5bc-443e-8116-42ee17e4acd3</span>
    </Escape>,
  ],
}
BlockEscapeTest.parameters = { chromatic: { disableSnapshot: true } }
