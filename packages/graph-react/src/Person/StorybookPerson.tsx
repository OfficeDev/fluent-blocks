import { Person as NaturalPerson, PersonProps } from './Person'
import { GraphProvider } from '../lib/GraphProvider'

export const Person = ({ query }: PersonProps) => (
    <GraphProvider>
      <NaturalPerson {...{ query }} />
    </GraphProvider>
  )
