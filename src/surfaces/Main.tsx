import { View as ViewProps } from '../../types/view'
import { Section } from '../blocks/Section'
import { makeStyles } from '@fluentui/react-components'
import { rem } from '../lib'

type MainProps = ViewProps['main']

const useStyles = makeStyles({
  root: (theme) => {
    console.log('theme', theme)
    return {
      overflow: 'hidden',
      '--surface-background': theme.alias.color.neutral.neutralBackground3,
      '--surface-foreground': theme.alias.color.neutral.neutralForeground3,
      backgroundColor: 'var(--surface-background)',
      color: 'var(--surface-foreground)',
      paddingBlockEnd: rem(44),
    }
  },
})

export const Main = (main: MainProps) => {
  const styles = useStyles()
  return <Section {...main} as="main" className={styles.root} />
}
