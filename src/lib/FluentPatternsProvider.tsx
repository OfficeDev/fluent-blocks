import { PropsWithChildren } from 'react'
import { FluentProvider } from '@fluentui/react-components'
import { Dir } from './readingDirection'
import { getTeamsTheme, Theme } from './theme'
import {
  FluentPatternsContext,
  FluentPatternsContextData,
} from './FluentPatternsContext'
import { ActionHandler } from './actions'

export const FluentPatternsProvider = ({
  dir = 'ltr',
  theme = 'light',
  onAction = () => {},
  children,
}: PropsWithChildren<{
  theme?: Theme
  dir?: Dir
  onAction?: ActionHandler
}>) => {
  const fluentTheme = getTeamsTheme(theme)
  const context: FluentPatternsContextData = {
    dir,
    theme,
    onAction,
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
