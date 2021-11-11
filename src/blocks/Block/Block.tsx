import { z } from 'zod'

import { invalidBlock, escapeElement, renderIfEscape } from '../../lib'

import {
  paragraphPropsOrElement,
  renderIfParagraph,
} from '../Paragraph/Paragraph'
import { figurePropsOrElement, renderIfFigure } from '../Figure/Figure'
import {
  shortInputsPropsOrElement,
  renderIfShortInputs,
} from '../ShortInputs/ShortInputs'
import {
  multilineTextInputPropsOrElement,
  renderIfMultilineTextInput,
  radioGroupPropsOrElement,
  renderIfRadioGroup,
} from '../../inputs'
import { layoutPropsOrElement, renderIfLayout } from '../Layout/Layout'

export const blockEntity = z.union([
  paragraphPropsOrElement,
  figurePropsOrElement,
  layoutPropsOrElement,
  shortInputsPropsOrElement,
  multilineTextInputPropsOrElement,
  radioGroupPropsOrElement,
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
  renderIfLayout(o) ||
  renderIfShortInputs(o) ||
  renderIfMultilineTextInput(o) ||
  renderIfRadioGroup(o) ||
  renderIfEscape(o) ||
  invalidBlock(o)
