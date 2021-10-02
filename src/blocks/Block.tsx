import { BlockProps, blockProps } from './Blocks'
import { Paragraph, isParagraph } from './Paragraph'
import { Figure, isFigure } from './Figure'
import { Inputs, isInputs } from './Inputs'
import { invalidBlock } from '../lib/warnings'
import { renderIfEscape } from '../lib/Escape'

export * from './Blocks'

/**
 * This component primarily serves as a way to route to more specific block elements based on which properties are present.
 */
export const Block = (props: BlockProps) => {
  const block = blockProps.parse(props)
  return isFigure(block) ? (
    <Figure {...block} />
  ) : isParagraph(block) ? (
    <Paragraph {...block} />
  ) : isInputs(block) ? (
    <Inputs {...block} />
  ) : (
    renderIfEscape(block) || invalidBlock(block)
  )
}
