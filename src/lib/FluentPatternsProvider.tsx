import { PropsWithChildren } from 'react'
import { FluentProvider } from '@fluentui/react-components'
import { Dir } from './readingDirection'
import { getTeamsTheme, Theme } from './theme'
import {
  FluentPatternsContext,
  FluentPatternsContextData,
} from './FluentPatternsContext'

export const FluentPatternsProvider = ({
  theme = 'light',
  dir = 'ltr',
  children,
}: PropsWithChildren<{ theme?: Theme; dir?: Dir }>) => {
  const fluentTheme = getTeamsTheme(theme)
  const context: FluentPatternsContextData = {
    dir,
    theme,
    fluentTheme,
  }
  return (
    <FluentProvider
      {...{
        theme: fluentTheme,
        targetDocument: typeof document === 'undefined' ? void 0 : document,
        dir,
      }}
    >
      <FluentPatternsContext.Provider value={context}>
        {children}
      </FluentPatternsContext.Provider>
    </FluentProvider>
  )
}
