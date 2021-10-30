import { getTeamsTheme, Theme } from './theme'
import { createContext, useContext } from 'react'
import { Dir } from './readingDirection'

export type FluentPatternsContextData = {
  dir: Dir
  theme: Theme
  fluentTheme: ReturnType<typeof getTeamsTheme>
}

export const FluentPatternsContext = createContext<FluentPatternsContextData>({
  dir: 'ltr',
  theme: 'light',
  fluentTheme: getTeamsTheme('light'),
})

export function useFluentPatternsContext() {
  return useContext(FluentPatternsContext)
}
