import { z } from 'zod'
import { buttonProps } from '../inputs'
import { mediaEntity } from '../media'
import { inlineSequenceOrString } from '../inlines'
import { headingLevel } from './Heading'

const actionProps = buttonProps.omit({ variant: true, type: true })

const actionsBlockProps = z.object({
  primary: actionProps.optional(),
  secondary: actionProps.optional(),
  tertiary: actionProps.optional(),
})

export const bigMessageProps = z.object({
  message: z.object({
    variant: z.literal('big'),
    media: mediaEntity.optional(),
    title: inlineSequenceOrString,
    abstract: inlineSequenceOrString.optional(),
    actions: actionsBlockProps.optional(),
    viewportHeight: z.boolean().optional(),
  }),
  level: headingLevel.default(2).optional(),
})
