import { Section, SectionContentProps } from '../blocks/Section/Section'
import { makeStyles } from '@fluentui/react-components'
import { rem } from '../lib'

const useMainSectionStyles = makeStyles({
  root: (theme) => ({
    overflow: 'hidden',
    '--surface-background': theme.alias.color.neutral.neutralBackground3,
    '--surface-foreground': theme.alias.color.neutral.neutralForeground3,
    backgroundColor: 'var(--surface-background)',
    color: 'var(--surface-foreground)',
    paddingBlockEnd: rem(44),
    paddingInlineStart: '1rem',
    paddingInlineEnd: '1rem',
  }),
})

export const Main = (props: SectionContentProps) => {
  const styles = useMainSectionStyles()
  return <Section {...props} as="main" level={1} className={styles.root} />
}
