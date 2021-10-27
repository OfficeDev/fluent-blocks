import { z } from 'zod'
import { Centered } from '../Centered/Centered'
import { Illustration } from '../Illustration'

export const communicationProps = z.object({
  image: z.string(),
  title: z.string(),
  description: z.string(),
  actions: z.string(),
})

export type CommunicationProps = z.infer<typeof communicationProps>

export function Communication(props: CommunicationProps) {
  const { image, title, description, actions } = props
  return (
    <Centered>
      <Illustration />
    </Centered>
  )
}
