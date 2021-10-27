import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import { rem } from './index'

const useStyles = makeStyles({
  root: (theme) => ({
    boxSizing: 'border-box',
    minHeight: '3rem',
    marginInlineStart: rem(4),
    marginInlineEnd: rem(4),
    marginBlockStart: rem(4),
    marginBlockEnd: rem(4),
    padding: rem(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.alias.color.red.border2,
    borderRadius: rem(6),

    color: theme.alias.color.red.foreground1,
  }),
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
