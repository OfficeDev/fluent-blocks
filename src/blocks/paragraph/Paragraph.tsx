import { Paragraph as ParagraphProps } from '../../../types/view'
import { PhrasingContent } from '../../fragments/phrasing-content/PhrasingContent'
import { makeStyles } from '@fluentui/react-components'
import { rem } from '../../lib'
import { PropsWithPath } from '../../lib/types'

const useStyles = makeStyles({
  root: {
    maxWidth: rem(432),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})

export const Heading = ({ paragraph, path, level = 6 }: PropsWithPath<ParagraphProps> & { level: number }) => {
  const content = <PhrasingContent elements={paragraph} path={path} />
  const styles = useStyles()
  switch (level) {
    case 1:
      return <h1 className={styles.root}>{content}</h1>
    case 2:
      return <h2 className={styles.root}>{content}</h2>
    case 3:
      return <h3 className={styles.root}>{content}</h3>
    case 4:
      return <h4 className={styles.root}>{content}</h4>
    case 5:
      return <h5 className={styles.root}>{content}</h5>
    default:
      return <h6 className={styles.root}>{content}</h6>
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
