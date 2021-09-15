import {
  Blocks,
  Paragraph as ParagraphProps,
  // Figure as FigureProps
} from '../../types/view'
import { Paragraph } from './paragraph/Paragraph'
// import {Figure} from "./figure/Figure";

/**
 * This component primarily serves as a way to route to more specific block elements based on which properties are present.
 */
export const Block = (block: Blocks[0]) => {
  if (block.hasOwnProperty('paragraph')) {
    return <Paragraph {...(block as ParagraphProps)} />
  }
  // if(block.hasOwnProperty('media')) { return <Figure {...block as FigureProps }/> }
  else {
    console.warn('Unsupported block:', block)
    return null
  }
}
