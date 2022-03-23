import { createContext, useContext } from 'react'
import noop from 'lodash/noop'

import { AccentScheme, getTheme, ThemeName } from './theme'
import { ActionHandler } from './actions'
import { Translations, defaultTranslations } from './translations'

export type FluentPatternsBlocksData = {
  translations: Translations
  themeName: ThemeName
  accentScheme: AccentScheme
  theme: ReturnType<typeof getTheme>
  onAction: ActionHandler<any>
  basicSpriteUrl: string
}

export const defaultContext: FluentPatternsBlocksData = {
  translations: defaultTranslations,
  themeName: 'light',
  accentScheme: 'web',
  theme: getTheme('light', 'web'),
  onAction: noop,
  basicSpriteUrl: '/sprites/basic-icons.svg',
}

export const FluentBlocksContext =
  createContext<FluentPatternsBlocksData>(defaultContext)

export function useFluentBlocksContext() {
  return useContext(FluentBlocksContext)
}
