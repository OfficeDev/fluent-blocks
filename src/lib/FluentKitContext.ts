import { getTeamsTheme, Theme } from './theme'
import { createContext, useContext } from 'react'
import { Dir } from './readingDirection'

export type FluentKitContextData = {
  dir: Dir
  theme: Theme
  fluentTheme: ReturnType<typeof getTeamsTheme>
}

export const FluentKitContext = createContext<FluentKitContextData>({
  dir: 'ltr',
  theme: 'light',
  fluentTheme: getTeamsTheme('light'),
})

export function useFluentKitContext() {
  return useContext(FluentKitContext)
}
