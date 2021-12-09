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
import { tabsPropsOrElement, renderIfTabs } from '../Tabs/Tabs'

export const blockEntity = z.union([
  paragraphPropsOrElement,
  layoutPropsOrElement,
  figurePropsOrElement,
  cardPropsOrElement,
  tabsPropsOrElement,
  shortInputsPropsOrElement,
  multilineTextInputPropsOrElement,
  radioGroupPropsOrElement,
  bigMessagePropsOrElement,
  escapeElement,
])
export type BlockEntity = z.infer<typeof blockEntity>

export const blockSequence = z.array(blockEntity)
export type BlockSequence = z.infer<typeof blockSequence>

/**
 * This component primarily serves as a way to route to more specific block elements based on which properties are present.
 */
export const Block = (o: BlockEntity) =>
  renderIfParagraph(o) ||
  renderIfLayout(o) ||
  renderIfFigure(o) ||
  renderIfCard(o) ||
  renderIfTabs(o) ||
  renderIfShortInputs(o) ||
  renderIfMultilineTextInput(o) ||
  renderIfRadioGroup(o) ||
  renderIfBigMessage(o) ||
  renderIfEscape(o) ||
  invalidBlock(o)
