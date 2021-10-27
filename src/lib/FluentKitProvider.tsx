import { PropsWithChildren } from 'react'
import { FluentProvider } from '@fluentui/react-components'

import { Dir } from './readingDirection'
import { getTeamsTheme, Theme } from './theme'

export const FluentKitProvider = ({
  theme,
  dir,
  children,
}: PropsWithChildren<{ theme: Theme; dir: Dir }>) => (
  <FluentProvider
    {...{
      theme: getTeamsTheme(theme),
      targetDocument: typeof document === 'undefined' ? void 0 : document,
      dir,
    }}
  >
    {children}
  </FluentProvider>
)
