import { Paragraph as ParagraphProps } from '../../../types/view'
import { PhrasingContent } from '../../fragments/phrasing-content/PhrasingContent'
import { makeStyles, mergeClasses } from '@fluentui/react-components'
import { rem } from '../../lib'
import { PropsWithPath } from '../../lib/types'

const useStyles = makeStyles({
  root: {
    maxWidth: rem(432),
    lineHeight: 20 / 14,
    marginInlineStart: 'auto',
    marginInlineEnd: 'auto',
    marginBlockStart: rem(4),
    marginBlockEnd: rem(4),
  },
  heading: (theme) => ({
    color: theme.alias.color.neutral.neutralForeground1,
    fontSize: 'inherit',
    fontWeight: 600,
    marginBlockStart: rem(24),
  }),
  h1: {
    fontSize: rem(18),
    lineHeight: 24 / 18,
    fontWeight: 700,
  },
})

export const Heading = ({ paragraph, path, level = 6 }: PropsWithPath<ParagraphProps> & { level: number }) => {
  const content = <PhrasingContent elements={paragraph} path={path} />
  const styles = useStyles()
  const headingClassName = mergeClasses(styles.root, styles.heading)
  switch (level) {
    case 1:
      return <h1 className={mergeClasses(styles.root, styles.heading, styles.h1)}>{content}</h1>
    case 2:
      return <h2 className={headingClassName}>{content}</h2>
    case 3:
      return <h3 className={headingClassName}>{content}</h3>
    case 4:
      return <h4 className={headingClassName}>{content}</h4>
    case 5:
      return <h5 className={headingClassName}>{content}</h5>
    default:
      return <h6 className={headingClassName}>{content}</h6>
  }
}

export const Paragraph = ({ paragraph, path }: PropsWithPath<ParagraphProps>) => {
  const styles = useStyles()
  return (
    <p className={styles.root}>
      <PhrasingContent elements={paragraph} path={path} />
    </p>
  )
}
