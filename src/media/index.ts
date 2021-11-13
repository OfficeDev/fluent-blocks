import { z } from 'zod'
import { escapeElement, renderIfEscape, invalidMedia } from '../lib'
import {
  illustrationPropsOrElement,
  renderIfIllustration,
} from './Illustration/Illustration'

export const mediaEntity = z.union([illustrationPropsOrElement, escapeElement])
export type MediaEntity = z.infer<typeof mediaEntity>

export const Media = (o: MediaEntity) =>
  renderIfIllustration(o) || renderIfEscape(o) || invalidMedia(o)

export * from './Illustration/Illustration'
export * from './ThemedImage/ThemedImage'
