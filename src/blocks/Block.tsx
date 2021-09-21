import {
  Blocks,
  Paragraph as ParagraphProps,
  // Figure as FigureProps
} from '../../types/view'
import { Paragraph } from './paragraph/Paragraph'
import { InputsProps, Inputs } from './inputs/Inputs'
import { PropsWithPath } from '../lib/types'
// import {Figure} from "./figure/Figure";

/**
 * This component primarily serves as a way to route to more specific block elements based on which properties are present.
 */
export const Block = (block: PropsWithPath<Blocks[0]>) => {
  switch (true) {
    case block.hasOwnProperty('paragraph'):
      return <Paragraph {...(block as PropsWithPath<ParagraphProps>)} />
    // case block.hasOwnProperty('media'): return <Figure {...block as FigureProps }/>
    case block.hasOwnProperty('inputs'):
      return <Inputs {...(block as PropsWithPath<InputsProps>)} />
    default:
      console.warn('Unsupported block:', block)
      return null
  }
}
