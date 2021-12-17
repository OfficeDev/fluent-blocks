import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import { rem, useCommonStyles } from '../../lib'

import { Section, SectionContentProps } from '../../blocks'

const useMainSectionStyles = makeStyles({
  root: (theme) => ({
    overflow: 'hidden',
    backgroundColor: 'var(--surface-background)',
    color: 'var(--surface-foreground)',
    paddingBlockEnd: rem(44),
    paddingInlineStart: '1rem',
    paddingInlineEnd: '1rem',
  }),
})

export const Main = (props: SectionContentProps) => {
  const mainStyles = useMainSectionStyles()
  const commonStyles = useCommonStyles()
  return (
    <Section
      {...props}
      as="main"
      level={1}
      className={cx(commonStyles.baseSurface, mainStyles.root)}
    />
  )
}
