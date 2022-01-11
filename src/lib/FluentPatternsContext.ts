import { getTeamsTheme, ThemeName } from './theme'
import { createContext, useContext } from 'react'
import { ActionHandler } from './actions'
import { Translations, defaultTranslations } from './translations'

export type FluentPatternsContextData = {
  translations: Translations
  themeName: ThemeName
  theme: ReturnType<typeof getTeamsTheme>
  onAction: ActionHandler
}

export const FluentPatternsContext = createContext<FluentPatternsContextData>({
  translations: defaultTranslations,
  themeName: 'light',
  theme: getTeamsTheme('light'),
  onAction: () => {},
})

export function useFluentPatternsContext() {
  return useContext(FluentPatternsContext)
}
