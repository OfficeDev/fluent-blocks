import { Parser } from 'htmlparser2'
import { InlineSequence } from '@fluent-blocks/schemas'

export const inlinesFromHtml = (html: string): InlineSequence => {
  const inlines: string[] = []
  const parser = new Parser({
    ontext(data: string) {
      inlines.push(data)
    },
  })
  parser.write(html)
  return inlines.length === 0
    ? [{ text: 'Empty', variant: 'caption' }]
    : inlines
}
