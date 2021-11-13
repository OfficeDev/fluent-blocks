import { makeStyles } from '@fluentui/react-components'

import { rem } from '../../lib'

import { Section, SectionContentProps } from '../../blocks'

const useMainSectionStyles = makeStyles({
  root: (theme) => ({
    overflow: 'hidden',
    '--surface-background': theme.colorNeutralBackground3,
    '--surface-foreground': theme.colorNeutralForeground3,
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
