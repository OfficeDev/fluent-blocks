import { View as ViewProps } from '../../../types/view'
import { Section } from '../../blocks/section/Section'
import { makeStyles } from '@fluentui/react-components'
type MainProps = ViewProps['main']

const useStyles = makeStyles({
  root: (theme) => {
    console.log('theme', theme)
    return {
      '--surface-background': theme.alias.color.neutral.neutralBackground3,
      '--surface-foreground': theme.alias.color.neutral.neutralForeground3,
      backgroundColor: 'var(--surface-background)',
      color: 'var(--surface-foreground)',
    }
  },
})

export const Main = (main: MainProps) => {
  const styles = useStyles()
  return <Section {...main} path={['m']} as="main" className={styles.root} />
}
