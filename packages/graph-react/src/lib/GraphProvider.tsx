import { createContext, PropsWithChildren, memo, useEffect } from 'react'
import { Client } from '@microsoft/microsoft-graph-client'
import { MsalProvider } from '@azure/msal-react'
import { msalConfig, loginRequest } from './authConfig'
import { PublicClientApplication } from '@azure/msal-browser'

export type GraphProviderContext = {
  tenantId: string
  clientId: string
  scopes: string[]
}

export const defaultContext = {
  tenantId: process.env.TENANT_ID ?? '',
  clientId: process.env.CLIENT_ID ?? '',
  scopes: process.env.SCOPES?.split(',') ?? [''],
}

/**
 * Initialize a PublicClientApplication instance which is provided to the MsalProvider component
 * We recommend initializing this outside of your root component to ensure it is not re-initialized on re-renders
 */

const msalInstance = new PublicClientApplication(msalConfig)
if (msalInstance.getAllAccounts()?.length === 0) {
  msalInstance.loginPopup(loginRequest).catch((e) => {
    console.log(e)
  })
}

export const GraphContext = createContext<GraphProviderContext>(defaultContext)

const UnmemoizedGraphProvider = ({
  children,
  ...props
}: PropsWithChildren<Partial<GraphProviderContext>>) => (
  <MsalProvider instance={msalInstance}>
    <GraphContext.Provider value={{ ...defaultContext, ...props }}>
      {children}
    </GraphContext.Provider>
  </MsalProvider>
)

export const GraphProvider = memo(UnmemoizedGraphProvider)
