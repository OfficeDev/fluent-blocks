import { z } from 'zod'
import { useFluentKitContext } from '../../lib/FluentKitContext'
import { ThemedImageProps } from './models'

import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

const useStyles = makeStyles({
  root: {
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      height: '100%',
    },
  },
})

export function ThemedImage(props: ThemedImageProps) {
  const { theme } = useFluentKitContext()
  const value = props[theme]
  const styles = useStyles()
  return (
    <div className={styles.root}>
      {typeof value == 'string' ? <img src={value} /> : value}
    </div>
  )
}
