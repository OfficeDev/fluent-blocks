import {View} from "./View";
import {Section} from "../../types/view";
import {View as ViewProps} from '../../types/view';

const defaultMain = {
  title: [{text: "Hello"}],
  abstract: [{text: 'This is the main section.'}]
} as Section

export default {
  title: "View",
  component: View,
  argTypes: {
    main: {
      name: "Main",
      defaultValue: defaultMain,
      control: {type: 'object'}
    }
  }
};

export const ViewDemo = (view: ViewProps) => {
  return <View {...view} />
}
