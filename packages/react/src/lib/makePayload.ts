import { ActionPayload, InputProps } from '../props'
import { getInputValues } from './sessionInputValues'

export function makePayload<P extends ActionPayload>(
  payloadProps: P,
  metadata?: InputProps['metadata'],
  include?: InputProps['include']
) {
  return {
    ...payloadProps,
    ...(metadata && { metadata }),
    ...(include && { includedValues: getInputValues(include) }),
  }
}
