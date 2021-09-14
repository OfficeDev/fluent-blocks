import {Section as SectionProps} from "../../../types/view";
import {Paragraph} from "../paragraph/Paragraph";

export const Section = ({title, abstract}: SectionProps) => {
  return <>
    <Paragraph paragraph={title}/>
    <Paragraph paragraph={abstract}/>
  </>
}
