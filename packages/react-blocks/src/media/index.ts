import { z } from 'zod'
import { escapeElement, renderIfEscape, invalidMedia } from '../lib'
import {
  illustrationPropsOrElement,
  renderIfIllustration,
} from './Illustration/Illustration'
import { codePropsOrElement, renderIfCode } from './Code/Code'
import {
  renderIfThemedImage,
  themedImagePropsOrElement,
} from './ThemedImage/ThemedImage'
import { chartPropsOrElement, renderIfChart } from './Chart/Chart'

export const mediaEntity = z.union([
  illustrationPropsOrElement,
  chartPropsOrElement,
  codePropsOrElement,
  themedImagePropsOrElement,
  escapeElement,
])
export type MediaEntity = z.infer<typeof mediaEntity>

export const Media = (o: MediaEntity) =>
  renderIfIllustration(o) ||
  renderIfChart(o) ||
  renderIfCode(o) ||
  renderIfThemedImage(o) ||
  renderIfEscape(o) ||
  invalidMedia(o)

export * from './Illustration/Illustration'
export * from './Code/Code'
export * from './ThemedImage/ThemedImage'
