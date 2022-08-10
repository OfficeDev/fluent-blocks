import noop from 'lodash/noop'
import { createContext, useContext } from 'react'

import { ActionHandler } from '../../props'
import { AccentScheme, ThemeName, getTheme } from '../theme'
import { Translations, defaultTranslations } from '../translations'

export type FluentPatternsBlocksData = {
  translations: Translations
  themeName: ThemeName
  accentScheme: AccentScheme
  theme: ReturnType<typeof getTheme>
  onAction: ActionHandler<any>
  iconSpriteUrl: string
  requiredVariant: 'requiredAsterisk' | 'optionalInParens'
}

export const defaultContext: FluentPatternsBlocksData = {
  translations: defaultTranslations,
  themeName: 'light',
  accentScheme: 'web',
  theme: getTheme('light', 'web'),
  onAction: noop,
  iconSpriteUrl: '/sprites/basic-icons.svg',
  requiredVariant: 'requiredAsterisk',
}

export const FluentBlocksContext =
  createContext<FluentPatternsBlocksData>(defaultContext)

export function useFluentBlocksContext() {
  return useContext(FluentBlocksContext)
}
