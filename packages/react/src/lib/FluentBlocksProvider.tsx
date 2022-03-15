import { PropsWithChildren } from 'react'
import { FluentProvider } from '@fluentui/react-components'
import { getTeamsTheme, ThemeName } from './theme'
import {
  FluentBlocksContext,
  FluentPatternsBlocksData,
} from './FluentBlocksContext'
import { ActionHandler } from './actions'
import { Translations, defaultTranslations } from './translations'

export const FluentBlocksProvider = ({
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
  const context: FluentPatternsBlocksData = {
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
      <FluentBlocksContext.Provider value={context}>
        {children}
      </FluentBlocksContext.Provider>
    </FluentProvider>
  )
}
