import { Chat as NaturalChat, ChatProps } from './Chat'
import { GraphProvider } from '../lib/GraphProvider'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react'

export const Chat = (_: ChatProps) => (
  <GraphProvider>
    <AuthenticatedTemplate>
      <NaturalChat />
    </AuthenticatedTemplate>
    <UnauthenticatedTemplate>
      <h5 className="card-title">
        Please sign-in to see your profile information.
      </h5>
    </UnauthenticatedTemplate>
  </GraphProvider>
)
