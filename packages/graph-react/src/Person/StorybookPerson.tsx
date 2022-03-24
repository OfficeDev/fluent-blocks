import { Person as NaturalPerson, PersonProps } from './Person'
import { GraphProvider } from '../lib/GraphProvider'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react'

export const Person = ({ query }: PersonProps) => (
  <GraphProvider>
    <AuthenticatedTemplate>
      <NaturalPerson query={query} />
    </AuthenticatedTemplate>
    <UnauthenticatedTemplate>
      <h5 className="card-title">
        Please sign-in to see your profile information.
      </h5>
    </UnauthenticatedTemplate>
  </GraphProvider>
)
