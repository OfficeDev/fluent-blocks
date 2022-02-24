import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import { rem } from './units'
import { sx } from './shorthands'

const useStyles = makeStyles({
  root: {
    boxSizing: 'border-box',
    minHeight: '3rem',
    ...sx.padding(rem(4)),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...sx.border('1px', 'solid', 'var(--colorPaletteRedBorder2)'),
    ...sx.borderRadius(rem(6)),
    color: 'var(--colorPaletteRedForeground1)',
  },
})

export const Placeholder = ({
  label,
  className,
}: {
  label: string
  className?: string
}) => {
  const styles = useStyles()
  return <div className={cx(styles.root, className)}>{label}</div>
}
