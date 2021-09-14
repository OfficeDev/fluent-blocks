import {Paragraph as ParagraphProps} from "../../../types/view";
import {PhrasingContent} from "../../fragments/phrasing-content/PhrasingContent";

export const Paragraph = ({paragraph}: ParagraphProps) => {
  return <p><PhrasingContent {...paragraph}/></p>
}