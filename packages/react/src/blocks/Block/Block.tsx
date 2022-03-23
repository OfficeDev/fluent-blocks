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
import {
  bigMessagePropsOrElement,
  renderIfBigMessage,
} from '../BigMessage/BigMessage'
import { layoutPropsOrElement, renderIfLayout } from '../Layout/Layout'
import { cardPropsOrElement, renderIfCard } from '../Card/Card'
import { toolbarPropsOrElement, renderIfToolbar } from '../Toolbar/Toolbar'

export type ZBlockEntity = z.ZodUnion<
  [
    typeof paragraphPropsOrElement,
    typeof layoutPropsOrElement,
    typeof figurePropsOrElement,
    typeof cardPropsOrElement,
    typeof toolbarPropsOrElement,
    typeof shortInputsPropsOrElement,
    typeof multilineTextInputPropsOrElement,
    typeof radioGroupPropsOrElement,
    typeof bigMessagePropsOrElement,
    typeof escapeElement
  ]
>
export const blockEntity: ZBlockEntity = z.union([
  paragraphPropsOrElement,
  layoutPropsOrElement,
  figurePropsOrElement,
  cardPropsOrElement,
  toolbarPropsOrElement,
  shortInputsPropsOrElement,
  multilineTextInputPropsOrElement,
  radioGroupPropsOrElement,
  bigMessagePropsOrElement,
  escapeElement,
])
export type BlockEntity = z.infer<ZBlockEntity>

export type ZBlockSequence = z.ZodArray<ZBlockEntity>
export const blockSequence: ZBlockSequence = z.array(blockEntity)
export type BlockSequence = z.infer<typeof blockSequence>

/**
 * This component primarily serves as a way to route to more specific block elements based on which properties are present.
 */
export const Block = (o: BlockEntity) =>
  renderIfParagraph(o) ||
  renderIfLayout(o) ||
  renderIfFigure(o) ||
  renderIfCard(o) ||
  renderIfToolbar(o) ||
  renderIfShortInputs(o) ||
  renderIfMultilineTextInput(o) ||
  renderIfRadioGroup(o) ||
  renderIfBigMessage(o) ||
  renderIfEscape(o) ||
  invalidBlock(o)
