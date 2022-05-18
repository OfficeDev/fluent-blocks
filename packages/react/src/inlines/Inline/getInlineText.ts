import get from 'lodash/get'
import isString from 'lodash/isString'

import { DescribedInlineSequenceOrString } from './DescribedInline'
import { InlineSequence } from './Inline'

export function getInlineText(
  inlineSequenceOrString:
    | InlineSequence
    | DescribedInlineSequenceOrString
    | string
): string {
  if (isString(inlineSequenceOrString)) {
    return inlineSequenceOrString
  } else {
    return (inlineSequenceOrString as InlineSequence).reduce(
      (acc: string, inline) => {
        const textValue = isString(inline) ? inline : get(inline, 'props', '')
        return acc + textValue
      },
      ''
    )
  }
}
