import { ThemedImage } from './ThemedImage'
import { NamedIllustrationProps } from './models'
import def from './Default'
import error from './Error'
import empty from './Empty'
import hello from './Hello'
import thanks from './Thanks'

const illustrations = { default: def, thanks, hello, empty, error }

export function NamedIllustration(props: NamedIllustrationProps) {
  const { name } = props
  const image = illustrations[name] ?? illustrations.error
  return <ThemedImage {...image} />
}
