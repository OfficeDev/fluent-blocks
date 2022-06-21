import {TopbarProps} from "@fluent-blocks/react";
import {FragmentProps} from "./props";

export default function topbar({pathname}: FragmentProps): TopbarProps | undefined {
  switch(pathname){
    case '/apps': return {
      near: {
        menu: [
          {action: {
          actionId: 'app:create',
            label: 'New app',
            icon: 'add'
          }},
          {action: {
          actionId: 'app:import',
            label: 'Import app',
            icon: 'arrow_upload'
          }},
        ]
      }
    }
    default: return undefined;
  }
}
