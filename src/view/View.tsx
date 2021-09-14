import {FluentProvider, teamsLightTheme} from '@fluentui/react-components'
import {View as ViewProps} from "../../types/view"
import {Main} from '../surfaces/main/Main'

const Provider = ({children}) => (<FluentProvider theme={teamsLightTheme} dir='ltr' targetDocument={typeof document === 'undefined' ? undefined : document}>{children}</FluentProvider>)

export const View = ({main}: ViewProps) => {
  return <Provider>
    <Main {...main} />
  </Provider>
}
