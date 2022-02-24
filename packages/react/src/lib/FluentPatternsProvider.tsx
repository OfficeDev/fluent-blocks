import { PropsWithChildren } from 'react'
import { FluentProvider } from '@fluentui/react-components'
import { getTeamsTheme, ThemeName } from './theme'
import {
  FluentPatternsContext,
  FluentPatternsContextData,
} from './FluentPatternsContext'
import { ActionHandler } from './actions'
import { Translations, defaultTranslations } from './translations'

export const FluentPatternsProvider = ({
  themeName = 'light',
  translations = defaultTranslations,
  onAction = () => {},
  children,
}: PropsWithChildren<{
  themeName?: ThemeName
  translations?: Translations
  onAction?: ActionHandler
}>) => {
  const theme = getTeamsTheme(themeName)
  const context: FluentPatternsContextData = {
    translations,
    themeName,
    onAction,
    theme,
  }
  return (
    <FluentProvider
      {...{
        theme,
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
