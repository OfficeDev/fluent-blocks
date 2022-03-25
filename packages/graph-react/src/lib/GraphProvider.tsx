import { createContext, memo, PropsWithChildren, useContext } from 'react'
import { ShortInputs } from '@fluent-blocks/react'
import { Client } from '@microsoft/microsoft-graph-client'
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser'
import {
  MsalProvider,
  MsalContext,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react'
import {
  InteractionType,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser'

export enum GraphEntity {
  UserProfile = 'me',
  ListMyChats = 'me/chats',
  ListMessages = 'me/chats/{0}/messages',
}

export function graphUri(graphApi: GraphEntity, ...param: string[]) {
  return replaceString(graphApi, param)
}

const replaceString = (input: string, param: string[]) => {
  for (let i = 0; i < param.length; i++) {
    input = input.replace(`{${i}}`, param[i])
  }
  return input
}

export interface GraphProviderProps {
  tenantId: string
  clientId: string
  scopes: string[]
  redirectUri: string
}

export const defaultGraphProviderProps: GraphProviderProps = {
  tenantId: process.env.TENANT_ID ?? '',
  clientId: process.env.CLIENT_ID ?? '',
  scopes: process.env.SCOPES?.split(',') ?? ['User.read', 'Chat.ReadWrite'],
  redirectUri: process.env.REDIRECT_URI ?? 'http://localhost:4000/',
}

type GraphGet = (uri: GraphEntity, ...params: string[]) => Promise<any>
type GraphPost = (
  uri: GraphEntity,
  payload: any,
  ...params: string[]
) => Promise<any>

export interface GraphContextValue {
  authProvider: AuthCodeMSALBrowserAuthenticationProvider | null
  graphClient: Client | null
  graphGet: GraphGet
  graphPost: GraphPost
}

export const defaultGraphContextValue: GraphContextValue = {
  authProvider: null,
  graphClient: null,
  graphGet: () => Promise.reject(),
  graphPost: () => Promise.reject(),
}

export const GraphContext = createContext<GraphContextValue>(
  defaultGraphContextValue
)

const UnmemoizedAuthenticatedGraphProvider = ({
  children,
  ...props
}: PropsWithChildren<Partial<GraphProviderProps>>) => {
  const { instance } = useContext(MsalContext)
  const accounts = instance.getAllAccounts()
  if (accounts.length) {
    instance.setActiveAccount(accounts[0])
  }
  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    instance as PublicClientApplication,
    {
      account: instance.getActiveAccount()!,
      scopes: props.scopes || defaultGraphProviderProps.scopes,
      interactionType: InteractionType.Popup,
    }
  )
  const graphClient = Client.initWithMiddleware({ authProvider })
  const graphGet = (uri: GraphEntity, ...params: string[]) =>
    graphClient!.api(graphUri(uri, ...params)).get()
  const graphPost = (uri: GraphEntity, payload: any, ...params: string[]) =>
    graphClient!.api(graphUri(uri, ...params)).post(payload)
  return (
    <GraphContext.Provider
      value={{ authProvider, graphClient, graphGet, graphPost }}
    >
      {children}
    </GraphContext.Provider>
  )
}

const AuthenticatedGraphProvider = memo(UnmemoizedAuthenticatedGraphProvider)

export const useGraph = () => useContext(GraphContext)

export const GraphProvider = (
  props: PropsWithChildren<Partial<GraphProviderProps>>
) => {
  const msalInstance = new PublicClientApplication({
    auth: {
      clientId: props.clientId || defaultGraphProviderProps.clientId,
      redirectUri: props.redirectUri || defaultGraphProviderProps.redirectUri,
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: 'sessionStorage', // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
      loggerOptions: {
        loggerCallback: (level: any, message: any, containsPii: any) => {
          if (containsPii) {
            return
          }
          switch (level) {
            case LogLevel.Error:
              console.error(message)
              return
            case LogLevel.Info:
              // console.log(message)
              return
            case LogLevel.Verbose:
              // console.debug(message)
              return
            case LogLevel.Warning:
              // console.warn(message)
              return
          }
        },
      },
    },
  })

  return (
    <MsalProvider instance={msalInstance}>
      <UnauthenticatedTemplate>
        <ShortInputs
          variant="narrow-block"
          inputs={[
            {
              actionId: 'msalLogin',
              type: 'action',
              variant: 'primary',
              label: 'Sign in to view this demo',
              onAction: () =>
                msalInstance.loginPopup({
                  ...defaultGraphProviderProps,
                  ...props,
                }),
            },
          ]}
        />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <AuthenticatedGraphProvider {...props} />
      </AuthenticatedTemplate>
    </MsalProvider>
  )
}
