import { z } from 'zod'
import { tabsProps } from '../blocks'
import { buttonProps } from '../inputs'
import { inlineSequenceOrString } from '../inlines'

// Widget is an exemplar of Card.

export const widgetProps = z.object({
  widget: tabsProps.omit({ tabVariant: true, tabListVariant: true }).merge(
    z.object({
      title: inlineSequenceOrString.optional(),
      abstract: inlineSequenceOrString.optional(),
      footerAction: buttonProps
        .omit({
          type: true,
          variant: true,
          iconOnly: true,
        })
        .optional(),
    })
  ),
})
