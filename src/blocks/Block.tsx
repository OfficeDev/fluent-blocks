import { z } from 'zod'
import { paragraphProps, renderIfParagraph } from './Paragraph'
import { figureProps, renderIfFigure } from './Figure'
import { inputsProps, renderIfInputs } from './Inputs'
import { invalidBlock } from '../lib/warnings'
import { escapeElement, renderIfEscape } from '../lib/Escape'

export const blockProps = z.union([
  paragraphProps,
  figureProps,
  inputsProps,
  escapeElement,
])
export type BlockProps = z.infer<typeof blockProps>

export const blockSequence = z.array(blockProps)
export type BlockSequence = z.infer<typeof blockSequence>

/**
 * This component primarily serves as a way to route to more specific block elements based on which properties are present.
 */
export const Block = (props: BlockProps) => {
  const block = blockProps.parse(props)
  return (
    renderIfFigure(block) ||
    renderIfParagraph(block) ||
    renderIfInputs(block) ||
    renderIfEscape(block) ||
    invalidBlock(block)
  )
}
