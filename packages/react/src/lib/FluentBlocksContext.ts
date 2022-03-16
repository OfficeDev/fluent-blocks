import { AccentScheme, getTheme, ThemeName } from './theme'
import { createContext, useContext } from 'react'
import { ActionHandler } from './actions'
import { Translations, defaultTranslations } from './translations'

export type FluentPatternsBlocksData = {
  translations: Translations
  themeName: ThemeName
  accentScheme: AccentScheme
  theme: ReturnType<typeof getTheme>
  onAction: ActionHandler
}

export const FluentBlocksContext = createContext<FluentPatternsBlocksData>({
  translations: defaultTranslations,
  themeName: 'light',
  accentScheme: 'web',
  theme: getTheme('light', 'web'),
  onAction: () => {},
})

export function useFluentBlocksContext() {
  return useContext(FluentBlocksContext)
}
