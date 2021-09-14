import {View as ViewProps} from "../../types/view"
import {Main} from '../surfaces/main/Main'

export const View = ({main}: ViewProps) => {
  return <Main {...main} />
}
