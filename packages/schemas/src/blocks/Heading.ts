import { z } from 'zod'
import { paragraphProps } from './Paragraph'

export const headingLevel = z.number().max(6).min(1)

export const headingProps = paragraphProps.extend({
  level: headingLevel.default(6).optional(),
})
