import { z } from 'zod'
import {
  paragraphPropsOrElement,
  renderIfParagraph,
} from '../Paragraph/Paragraph'
import { figurePropsOrElement, renderIfFigure } from '../Figure/Figure'
import { inputsPropsOrElement, renderIfInputs } from '../Inputs/Inputs'
import { invalidBlock, escapeElement, renderIfEscape } from '../../lib'

export const blockEntity = z.union([
  paragraphPropsOrElement,
  figurePropsOrElement,
  inputsPropsOrElement,
  escapeElement,
])
export type BlockEntity = z.infer<typeof blockEntity>

export const blockSequence = z.array(blockEntity)
export type BlockSequence = z.infer<typeof blockSequence>

/**
 * This component primarily serves as a way to route to more specific block elements based on which properties are present.
 */
export const Block = (o: BlockEntity) =>
  renderIfFigure(o) ||
  renderIfParagraph(o) ||
  renderIfInputs(o) ||
  renderIfEscape(o) ||
  invalidBlock(o)
