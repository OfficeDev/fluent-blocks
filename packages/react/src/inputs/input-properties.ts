import { z } from 'zod'
import {
  inputProps as naturalInputProps,
  inputPropsWithInitialStringValue as naturalInputPropsWithInitialStringValue,
  textInputProps as naturalTextInputProps,
  labeledValueProps as naturalLabeledValueProps,
} from '@fluentui/blocks-schemas'

import { inlineSequenceOrString } from '../inlines'

export const labelWithElements = z.object({ label: inlineSequenceOrString })

export const inputProps = naturalInputProps.merge(labelWithElements)

export const inputPropsWithInitialStringValue =
  naturalInputPropsWithInitialStringValue.merge(labelWithElements)

export const textInputProps = naturalTextInputProps.merge(labelWithElements)

export const labeledValueProps =
  naturalLabeledValueProps.merge(labelWithElements)

export const shortInputContextualVariants = z
  .object({
    contextualVariant: z
      .union([
        z.literal('block-inputs'),
        z.literal('card-inputs'),
        z.literal('narrow-inputs'),
        z.literal('tabs'),
        z.literal('toolbar-item'),
        z.literal('toolbar-item--needs-update'),
        z.literal('toolbar-item--hidden'),
      ])
      .default('block-inputs'),
    selected: z.boolean().default(false),
    controls: z.string(),
  })
  .partial()
