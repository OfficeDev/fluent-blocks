import { PropsWithChildren } from 'react'
import { FluentProvider } from '@fluentui/react-components'
import { getTeamsTheme, Theme } from './theme'
import {
  FluentPatternsContext,
  FluentPatternsContextData,
} from './FluentPatternsContext'
import { ActionHandler } from './actions'
import { Translations, defaultTranslations } from './translations'

export const FluentPatternsProvider = ({
  theme = 'light',
  translations = defaultTranslations,
  onAction = () => {},
  children,
}: PropsWithChildren<{
  theme?: Theme
  translations?: Translations
  onAction?: ActionHandler
}>) => {
  const fluentTheme = getTeamsTheme(theme)
  const context: FluentPatternsContextData = {
    translations,
    theme,
    onAction,
    fluentTheme,
  }
  return (
    <FluentProvider
      {...{
        theme: fluentTheme,
        targetDocument: typeof document === 'undefined' ? void 0 : document,
        dir: translations.dir,
      }}
    >
      <FluentPatternsContext.Provider value={context}>
        {children}
      </FluentPatternsContext.Provider>
    </FluentProvider>
  )
}
