import { ViewContent } from '@fluent-blocks/react'

export default function Home() {
  return (
    <ViewContent
      main={{
        title: 'Home',
        abstract: 'Inluding the hero and all that jazz.',
      }}
      sidebar={{
        title: 'Developer portal',
        menu: [
          {
            action: { actionId: 'navL1:home', icon: 'home', iconVariant: 'filled', label: 'Home', variant: 'subtle' },
          },
          {
            action: { actionId: 'navL1:apps', icon: 'apps', label: 'Apps', variant: 'subtle' },
          },
          {
            action: {
              actionId: 'navL1:tools',
              icon: 'wrench',
              label: 'Tools',
              variant: 'subtle',
            },
          },
        ],
      }}
    />
  )
}
