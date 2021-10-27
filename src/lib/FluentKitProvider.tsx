import { PropsWithChildren } from 'react'
import { FluentProvider } from '@fluentui/react-components'
import { Dir } from './readingDirection'
import { getTeamsTheme, Theme } from './theme'
import { FluentKitContext, FluentKitContextData } from './FluentKitContext'

export const FluentKitProvider = ({
  theme,
  dir,
  children,
}: PropsWithChildren<{ theme: Theme; dir: Dir }>) => {
  const fluentTheme = getTeamsTheme(theme)
  const context: FluentKitContextData = {
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
      <FluentKitContext.Provider value={context}>
        {children}
      </FluentKitContext.Provider>
    </FluentProvider>
  )
}
