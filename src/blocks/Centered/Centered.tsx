import { z } from 'zod'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

export const centeredProps = z.object({
  fullHeight: z.boolean().optional(),
  children: z.any().optional(),
})

export type CenteredProps = z.infer<typeof centeredProps>

const useCenteredStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullHeight: {
    minHeight: '100vh',
  },
  container: {
    margin: '20px',
    maxWidth: '510px',
    minWidth: '280px',
    width: '100%',
  },
})

export function Centered(props: CenteredProps) {
  const { fullHeight, children } = { fullHeight: true, ...props }
  const styles = useCenteredStyles()
  return (
    <div
      className={fullHeight ? cx(styles.root, styles.fullHeight) : styles.root}
    >
      <div className={styles.container}>{children}</div>
    </div>
  )
}
