import {TopbarProps} from "@fluent-blocks/react";

export default function topbar(pathname: string): TopbarProps | undefined {
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