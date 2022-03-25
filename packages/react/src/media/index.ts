import { EscapeElement, renderIfEscape, invalidMedia } from '../lib'
import {
  IllustrationPropsOrElement,
  renderIfIllustration,
} from './Illustration/Illustration'
import { CodePropsOrElement, renderIfCode } from './Code/Code'
import {
  renderIfThemedImage,
  ThemedImagePropsOrElement,
} from './ThemedImage/ThemedImage'
import { ChartPropsOrElement, renderIfChart } from './Chart/Chart'

export type MediaEntity =
  | IllustrationPropsOrElement
  | ChartPropsOrElement
  | CodePropsOrElement
  | ThemedImagePropsOrElement
  | EscapeElement

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
export * from './Avatar/Avatar'
