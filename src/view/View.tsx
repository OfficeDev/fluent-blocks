import { FluentProvider, teamsLightTheme, teamsDarkTheme, teamsHighContrastTheme } from '@fluentui/react-components'
import { View as ViewProps } from '../../types/view'
import { Main } from '../surfaces/main/Main'
import { PropsWithChildren } from 'react'

const Provider = ({ theme, dir, children }: PropsWithChildren<{ theme: ViewProps['theme']; dir: ViewProps['dir'] }>) => (
  <FluentProvider
    {...{
      theme: (() => {
        switch (theme) {
          case 'dark':
            return teamsDarkTheme
          case 'high-contrast':
            return teamsHighContrastTheme
          default:
            return teamsLightTheme
        }
      })(),
      targetDocument: typeof document === 'undefined' ? undefined : document,
      dir,
    }}
  >
    {children}
  </FluentProvider>
)

export const View = ({ main, theme, dir }: ViewProps) => (
  <Provider {...{ theme, dir }}>
    <Main {...main} />
  </Provider>
)
