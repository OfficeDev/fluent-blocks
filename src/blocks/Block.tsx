import { BlockProps, blockProps } from './Blocks'
import { Paragraph, ParagraphProps , isParagraph } from './Paragraph'
import { Figure, FigureProps , isFigure } from './Figure'
import { InputsProps, Inputs } from './Inputs'
import { invalidBlock } from '../lib/warnings'

export * from './Blocks'

/**
 * This component primarily serves as a way to route to more specific block elements based on which properties are present.
 */
export const Block = (props: BlockProps) => {
  const block = blockProps.parse(props)
  return isFigure(block) ? (
    <Figure {...block} />
  ) : isParagraph(props) ? (
    <Paragraph {...block} />
  ) : (
    invalidBlock(props)
  )
}
