import { createElement } from 'react'
import { Section as SectionProps } from '../../../types/view'
import { Paragraph, Heading } from '../paragraph/Paragraph'
import { Block } from '../Block'
import { makeStyles } from '@fluentui/react-components'
import { PropsWithPath } from '../../lib/types'
import { nextPathAndKey, nextPath } from '../../lib'

const useStyles = makeStyles({
  root: { overflow: 'hidden' },
})

export const Section = ({
  title,
  abstract,
  sections,
  blocks,
  path,
  as = 'section',
}: PropsWithPath<SectionProps> & { as?: string }) => {
  const styles = useStyles()
  return createElement(
    as,
    { className: styles.root },
    <>
      {title && <Heading paragraph={title} level={path.length} path={nextPath(path, 'h')} />}
      {abstract && <Paragraph paragraph={abstract} path={nextPath(path, 'a')} />}
      {(blocks || []).map((block, b) => {
        const [nextPath, key] = nextPathAndKey(path, `b${b}`)
        return <Block {...block} path={nextPath} key={key} />
      })}
      {(sections || []).map((section, s) => {
        const [nextPath, key] = nextPathAndKey(path, `${s}`)
        return <Section {...section} path={nextPath} key={key} />
      })}
    </>
  )
}
