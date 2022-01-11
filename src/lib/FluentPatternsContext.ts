import { getTeamsTheme, Theme } from './theme'
import { createContext, useContext } from 'react'
import { ActionHandler } from './actions'
import { Translations, defaultTranslations } from './translations'

export type FluentPatternsContextData = {
  translations: Translations
  theme: Theme
  fluentTheme: ReturnType<typeof getTeamsTheme>
  onAction: ActionHandler
}

export const FluentPatternsContext = createContext<FluentPatternsContextData>({
  translations: defaultTranslations,
  theme: 'light',
  fluentTheme: getTeamsTheme('light'),
  onAction: () => {},
})

export function useFluentPatternsContext() {
  return useContext(FluentPatternsContext)
}
