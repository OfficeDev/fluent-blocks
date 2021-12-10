import { z } from 'zod'
import { escapeElement, renderIfEscape, invalidMedia } from '../lib'
import {
  illustrationPropsOrElement,
  renderIfIllustration,
} from './Illustration/Illustration'
import { codePropsOrElement, renderIfCode } from './Code/Code'

export const mediaEntity = z.union([
  illustrationPropsOrElement,
  codePropsOrElement,
  escapeElement,
])
export type MediaEntity = z.infer<typeof mediaEntity>

export const Media = (o: MediaEntity) =>
  renderIfIllustration(o) ||
  renderIfCode(o) ||
  renderIfEscape(o) ||
  invalidMedia(o)

export * from './Illustration/Illustration'
export * from './Code/Code'
export * from './ThemedImage/ThemedImage'
