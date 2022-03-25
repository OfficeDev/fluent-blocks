import { Suspense, useMemo } from 'react'
import { GraphEntity, graphUri, useGraph } from '../lib/GraphProvider'
import { AsyncResource } from '../lib/Resource/AsyncResource'
import { ChatMessage } from 'microsoft-graph'

export interface ChatProps {}

const ChatMessages = ({
  chatResource,
}: {
  chatResource: AsyncResource<ChatMessage[]>
}) => {
  const messages = chatResource.read()
  if (messages) {
    return <pre>{JSON.stringify(messages, null, 4)}</pre>
  } else {return null}
}

export const Chat = (_: ChatProps) => {
  const { graphClient } = useGraph()

  const chatResource = useMemo(
    () =>
      new AsyncResource(
        graphClient!
          .api(graphUri(GraphEntity.ListMyChats))
          .get()
          .then(({ value }) =>
            graphClient!
              .api(graphUri(GraphEntity.ListMessages, value[0].id))
              .get()
          )
          .then(({ value }) => value)
      ),
    []
  )

  return (
    <Suspense fallback={'Loading…'}>
      <ChatMessages {...{ chatResource }} />
    </Suspense>
  )
}
