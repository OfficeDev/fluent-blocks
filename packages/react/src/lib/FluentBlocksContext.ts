import { getTeamsTheme, ThemeName } from './theme'
import { createContext, useContext } from 'react'
import { ActionHandler } from './actions'
import { Translations, defaultTranslations } from './translations'

export type FluentPatternsBlocksData = {
  translations: Translations
  themeName: ThemeName
  theme: ReturnType<typeof getTeamsTheme>
  onAction: ActionHandler
}

export const FluentBlocksContext = createContext<FluentPatternsBlocksData>({
  translations: defaultTranslations,
  themeName: 'light',
  theme: getTeamsTheme('light'),
  onAction: () => {},
})

export function useFluentBlocksContext() {
  return useContext(FluentBlocksContext)
}
