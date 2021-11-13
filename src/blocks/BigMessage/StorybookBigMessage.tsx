import { BigMessageProps, BigMessage as NaturalBigMessage } from './BigMessage'

export const BigMessage = (props: BigMessageProps['message']) => (
  <NaturalBigMessage message={props} />
)
