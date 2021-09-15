import { View as ViewProps } from '../../../types/view'
import { Section } from '../../blocks/section/Section'
type MainProps = ViewProps['main']

export const Main = (main: MainProps) => <Section {...main} path={['m']} as="main" />
