import {SidebarProps} from "@fluent-blocks/react";

export default function sidebarFragment(pathname: string): SidebarProps {
  return {
    title: 'Developer portal',
    defaultActiveItem: `nav:${pathname}`,
    menu: [
      {
        action: { actionId: 'nav:/', icon: 'home', label: 'Home', variant: 'subtle' as 'subtle' },
      },
      {
        action: { actionId: 'nav:/apps', icon: 'apps', label: 'Apps', variant: 'subtle' as 'subtle' },
      },
      {
        action: {
          actionId: 'nav:/tools',
          icon: 'wrench',
          label: 'Tools',
          variant: 'subtle' as 'subtle',
        },
      },
    ]
  }
}
