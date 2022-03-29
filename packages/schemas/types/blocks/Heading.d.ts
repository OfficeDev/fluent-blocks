import { ParagraphProps } from './Paragraph'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface HeadingProps extends ParagraphProps {
  level?: HeadingLevel
  visuallyHidden?: boolean
}
