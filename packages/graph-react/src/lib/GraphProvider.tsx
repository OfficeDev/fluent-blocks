import { createContext, PropsWithChildren, memo } from 'react'
import { FluentBlocksProvider } from '@fluent-blocks/react/src/lib'

import {
  PublicClientApplication,
  EventType,
  EventMessage,
  AuthenticationResult,
} from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'

export type GraphProviderContext = {
  appId: string
  redirectUri: string
  scopes: string[]
}

export const defaultContext = {
  appId: '0',
  redirectUri: 'http://localhost:4000',
  scopes: ['user.read'],
}

export const GraphContext = createContext<GraphProviderContext>(defaultContext)

const UnmemoizedGraphProvider = ({
  children,
  ...props
}: PropsWithChildren<Partial<GraphProviderContext>>) => {
  console.log('[Initializing MSAL et al]')

  const pca = new PublicClientApplication({
    auth: {
      clientId: props.appId || defaultContext.appId,
      redirectUri: props.redirectUri || defaultContext.redirectUri,
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: true,
    },
  })

  const accounts = pca.getAllAccounts()

  if (accounts && accounts.length > 0) {
    pca.setActiveAccount(accounts[0])
  }

  pca.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      // Set the active account - this simplifies token acquisition
      const authResult = event.payload as AuthenticationResult
      pca.setActiveAccount(authResult.account)
    }
  })

  return (
    <MsalProvider instance={pca}>
      <GraphContext.Provider value={{ ...defaultContext, ...props }}>
        <FluentBlocksProvider>{children}</FluentBlocksProvider>
      </GraphContext.Provider>
    </MsalProvider>
  )
}

export const GraphProvider = memo(UnmemoizedGraphProvider)
