import { z } from 'zod'
import { useFluentKitContext } from '../../lib/FluentKitContext'
import { ThemedImageProps } from './models'
import { UrlImage } from './UrlImage'

export function ThemedImage(props: ThemedImageProps) {
  const { theme } = useFluentKitContext()
  const value = props[theme]
  return typeof value == 'string' ? <UrlImage url={value} /> : value
}
