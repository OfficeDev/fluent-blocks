import { z } from 'zod'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import { rem } from '../../lib'

export const centeredProps = z.object({
  fullHeight: z.boolean().optional(),
  children: z.any().optional(),
})

export type CenteredProps = z.infer<typeof centeredProps>

const useCenteredStyles = makeStyles({
  root: {},
  fullHeight: {
    minHeight: '100vh',
  },
})

export function Centered(props: CenteredProps) {
  const { fullHeight, children } = props
  const styles = useCenteredStyles()
  return (
    <div
      className={fullHeight ? cx(styles.root, styles.fullHeight) : styles.root}
    >
      {children}
    </div>
  )
}
