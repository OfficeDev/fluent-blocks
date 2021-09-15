import { Section as SectionProps } from '../../../types/view'
import { Paragraph, Heading } from '../paragraph/Paragraph'
import { Block } from '../Block'
import { makeStyles } from '@fluentui/react-components'
import { PropsWithPath } from '../../lib/types'
import { nextPathAndKey } from '../../lib'

const useStyles = makeStyles({
  root: { overflow: 'hidden' },
})

export const Section = ({ title, abstract, sections, blocks, path }: PropsWithPath<SectionProps>) => {
  const styles = useStyles()
  return (
    <section className={styles.root}>
      {title && <Heading paragraph={title} level={path.length} path={path} />}
      {abstract && <Paragraph paragraph={abstract} path={path} />}
      {(blocks || []).map((block, b) => {
        const [nextPath, key] = nextPathAndKey(path, `b${b}`)
        return <Block {...block} path={nextPath} key={key} />
      })}
      {(sections || []).map((section, s) => {
        const [nextPath, key] = nextPathAndKey(path, `${s}`)
        return <Section {...section} path={nextPath} key={key} />
      })}
    </section>
  )
}
