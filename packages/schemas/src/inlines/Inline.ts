import { z, ZodTypeAny } from 'zod'
import * as ex from '../lib/extensible-types'
import { textProps } from './Text'
import { iconProps } from './Icon'

export const inlineEntity = ex.union([z.string(), textProps(), iconProps()])

export const inlineSequence = (additionalMembers?: ZodTypeAny[]) =>
  z.array(inlineEntity(additionalMembers))

export const inlineSequenceOrString = (additionalMembers?: ZodTypeAny[]) =>
  z.union([z.string(), inlineSequence(additionalMembers)])

export const inlineContentProp = (additionalMembers?: ZodTypeAny[]) =>
  z.object({
    inlines: inlineSequenceOrString(additionalMembers),
  })
