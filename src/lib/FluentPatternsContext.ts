import { getTeamsTheme, Theme } from './theme'
import { createContext, useContext } from 'react'
import { Dir } from './readingDirection'
import { ActionHandler } from './actions'

export type FluentPatternsContextData = {
  dir: Dir
  theme: Theme
  fluentTheme: ReturnType<typeof getTeamsTheme>
  onAction: ActionHandler
}

export const FluentPatternsContext = createContext<FluentPatternsContextData>({
  dir: 'ltr',
  theme: 'light',
  fluentTheme: getTeamsTheme('light'),
  onAction: () => {},
})

export function useFluentPatternsContext() {
  return useContext(FluentPatternsContext)
}
