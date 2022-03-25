import { useEffect, useState } from 'react'
import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import { loginRequest } from '../lib/AuthConfig'
import { callMsGraph, GraphApi } from '../lib/Graph'

export type PersonProps = {
  query: string
}

export const Person = ({ query }: PersonProps) => {
  const { instance, accounts } = useMsal()
  const [graphData, setGraphData] = useState('')
  const isAuthenticated = useIsAuthenticated()

  // Silently acquires an access token which is then attached to a request for MS Graph data
  useEffect(() => {
    if (isAuthenticated) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          callMsGraph(response.accessToken, GraphApi.ListMyChats).then(
            (response) => setGraphData(JSON.stringify(response))
          )
        })
    }
  }, [instance, accounts, isAuthenticated])
  return <div>{graphData}</div>
}
