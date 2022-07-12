import { EscapeElement, invalidMedia, renderIfEscape } from '../lib'
import { ChartPropsOrElement, renderIfChart } from './Chart/Chart'
import { CodePropsOrElement, renderIfCode } from './Code/Code'
import {
  IllustrationPropsOrElement,
  renderIfIllustration,
} from './Illustration/Illustration'
import { LoadingPropsOrElement, renderIfLoading } from './Loading/Loading'
import {
  ThemedImagePropsOrElement,
  renderIfThemedImage,
} from './ThemedImage/ThemedImage'

export type MediaEntity =
  | IllustrationPropsOrElement
  | ChartPropsOrElement
  | CodePropsOrElement
  | ThemedImagePropsOrElement
  | LoadingPropsOrElement
  | EscapeElement

export const Media = (o: MediaEntity) =>
  renderIfIllustration(o) ||
  renderIfChart(o) ||
  renderIfCode(o) ||
  renderIfThemedImage(o) ||
  renderIfLoading(o) ||
  renderIfEscape(o) ||
  invalidMedia(o)

export * from './Illustration/Illustration'
export * from './Code/Code'
export * from './ThemedImage/ThemedImage'
export * from './Loading/Loading'
