import { PropsWithChildren } from 'react'
import { FluentProvider } from '@fluentui/react-components'
import { AccentScheme, getTheme, ThemeName } from './theme'
import {
  FluentBlocksContext,
  FluentPatternsBlocksData,
} from './FluentBlocksContext'
import { ActionHandler } from './actions'
import { Translations, defaultTranslations } from './translations'

export const FluentBlocksProvider = ({
  themeName = 'light',
  accentScheme = 'web',
  translations = defaultTranslations,
  onAction = () => {},
  children,
}: PropsWithChildren<{
  themeName?: ThemeName
  accentScheme?: AccentScheme
  translations?: Translations
  onAction?: ActionHandler
}>) => {
  const theme = getTheme(themeName, accentScheme)
  const context: FluentPatternsBlocksData = {
    translations,
    themeName,
    accentScheme,
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
      <FluentBlocksContext.Provider value={context}>
        {children}
      </FluentBlocksContext.Provider>
    </FluentProvider>
  )
}
