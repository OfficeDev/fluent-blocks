import { Paragraph as ParagraphProps } from '../../../types/view'
import { PhrasingContent } from '../../fragments/phrasing-content/PhrasingContent'

export const Heading = ({ paragraph, level = 6 }: ParagraphProps & { level: number }) => {
  const content = <PhrasingContent {...paragraph} />
  switch (level) {
    case 1:
      return <h1>{content}</h1>
    case 2:
      return <h2>{content}</h2>
    case 3:
      return <h3>{content}</h3>
    case 4:
      return <h4>{content}</h4>
    case 5:
      return <h5>{content}</h5>
    default:
      return <h6>{content}</h6>
  }
}

export const Paragraph = ({ paragraph }: ParagraphProps) => (
    <p>
      <PhrasingContent {...paragraph} />
    </p>
  )
