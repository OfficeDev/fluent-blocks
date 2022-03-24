import { invalidBlock, EscapeElement, renderIfEscape } from '../../lib'

import {
  ParagraphPropsOrElement,
  renderIfParagraph,
} from '../Paragraph/Paragraph'
import { FigurePropsOrElement, renderIfFigure } from '../Figure/Figure'
import {
  ShortInputsPropsOrElement,
  renderIfShortInputs,
} from '../ShortInputs/ShortInputs'
import {
  MultilineTextInputPropsOrElement,
  renderIfMultilineTextInput,
  RadioGroupPropsOrElement,
  renderIfRadioGroup,
} from '../../inputs'
import {
  BigMessagePropsOrElement,
  renderIfBigMessage,
} from '../BigMessage/BigMessage'
import { LayoutPropsOrElement, renderIfLayout } from '../Layout/Layout'
import { CardPropsOrElement, renderIfCard } from '../Card/Card'
import { ToolbarPropsOrElement, renderIfToolbar } from '../Toolbar/Toolbar'

export type BlockEntity =
  | ParagraphPropsOrElement
  | LayoutPropsOrElement
  | FigurePropsOrElement
  | CardPropsOrElement
  | ToolbarPropsOrElement
  | ShortInputsPropsOrElement
  | MultilineTextInputPropsOrElement
  | RadioGroupPropsOrElement
  | BigMessagePropsOrElement
  | EscapeElement

export type BlockSequence = BlockEntity[]

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
