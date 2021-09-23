import { BlockProps, blockProps } from './Blocks'
import { Paragraph, isParagraph, ParagraphProps } from './Paragraph'
import { Figure, isFigure, FigureProps } from './Figure'
import { Inputs, isInputs, InputsProps } from './Inputs'
import { invalidBlock } from '../lib/warnings'

export * from './Blocks'

/**
 * This component primarily serves as a way to route to more specific block elements based on which properties are present.
 */
export const Block = (props: BlockProps) => {
  const block = blockProps.parse(props)
  return isFigure(block) ? (
    <Figure {...(block as FigureProps)} />
  ) : isParagraph(props) ? (
    <Paragraph {...(block as ParagraphProps)} />
  ) : isInputs(props) ? (
    <Inputs {...(block as InputsProps)} />
  ) : (
    invalidBlock(props)
  )
}
