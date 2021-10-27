import { UrlImageProps } from './models'

export function UrlImage(props: UrlImageProps) {
  const { url } = props
  return <img src={url} />
}
