import {
  MultilineTextInputPropsOrElement,
  SelectPropsOrElement,
  renderIfMultilineTextInput,
  renderIfSelect,
} from '../../inputs'
import { EscapeElement, invalidBlock, renderIfEscape } from '../../lib'
import {
  BigMessagePropsOrElement,
  renderIfBigMessage,
} from '../BigMessage/BigMessage'
import { CardPropsOrElement, renderIfCard } from '../Card/Card'
import { FigurePropsOrElement, renderIfFigure } from '../Figure/Figure'
import { LayoutPropsOrElement, renderIfLayout } from '../Layout/Layout'
import { ListPropsOrElement, renderIfList } from '../List/List'
import {
  ParagraphPropsOrElement,
  renderIfParagraph,
} from '../Paragraph/Paragraph'
import {
  ShortInputsPropsOrElement,
  renderIfShortInputs,
} from '../ShortInputs/ShortInputs'
import { TablePropsOrElement, renderIfTable } from '../Table/Table'
import { ToolbarPropsOrElement, renderIfToolbar } from '../Toolbar/Toolbar'

export type BlockEntity =
  | ParagraphPropsOrElement
  | LayoutPropsOrElement
  | FigurePropsOrElement
  | CardPropsOrElement
  | ToolbarPropsOrElement
  | ShortInputsPropsOrElement
  | MultilineTextInputPropsOrElement
  | SelectPropsOrElement
  | BigMessagePropsOrElement
  | TablePropsOrElement
  | ListPropsOrElement
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
  renderIfSelect(o) ||
  renderIfBigMessage(o) ||
  renderIfTable(o) ||
  renderIfList(o) ||
  renderIfEscape(o) ||
  invalidBlock(o)
