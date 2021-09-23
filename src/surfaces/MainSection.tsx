import { Section, SectionProps } from '../blocks/Section'
import { makeStyles } from '@fluentui/react-components'
import { rem } from '../lib'

const useStyles = makeStyles({
  root: (theme) => ({
      overflow: 'hidden',
      '--surface-background': theme.alias.color.neutral.neutralBackground3,
      '--surface-foreground': theme.alias.color.neutral.neutralForeground3,
      backgroundColor: 'var(--surface-background)',
      color: 'var(--surface-foreground)',
      paddingBlockEnd: rem(44),
    }),
})

export const MainSection = (props: SectionProps) => {
  const styles = useStyles()
  return <Section {...props} as="main" level={1} className={styles.root} />
}
