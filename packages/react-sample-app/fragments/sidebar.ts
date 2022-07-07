import isNull from 'lodash/isNull'
import UrlPattern from 'url-pattern'

import { SidebarProps } from '@fluent-blocks/react'

import { FragmentProps } from './props'

const appsPattern = new UrlPattern('/apps/[appid](/:appconfig)')

// eslint-disable-next-line max-lines-per-function
export default function sidebarFragment({
  pathname,
  query,
}: FragmentProps): SidebarProps {
  const appsPatternMatch = appsPattern.match(pathname)
  switch (true) {
    case !isNull(appsPatternMatch):
      return {
        cornerActions: [
          { actionId: 'nav:/', label: 'Home', icon: 'home' },
          { actionId: 'nav:/apps', label: 'Apps', icon: 'apps' },
        ],
        title: 'App name',
        defaultActiveItem: `nav:/apps/${query.appid}${
          appsPatternMatch.appconfig ? `/${appsPatternMatch.appconfig}` : ''
        }`,
        defaultOpenItems: ['app:overview', 'app:configure', 'app:publish'],
        accordion: [
          {
            label: 'Overview',
            actionId: 'app:overview',
            menu: [
              {
                action: {
                  label: 'Dashboard',
                  actionId: `nav:/apps/${query.appid}`,
                },
              },
              {
                action: {
                  label: 'Analytics',
                  actionId: `nav:/apps/${query.appid}/analytics`,
                },
              },
            ],
          },
          {
            label: 'Configure',
            actionId: 'app:configure',
            menu: [
              {
                action: {
                  label: 'Basic information',
                  actionId: `nav:/apps/${query.appid}/basic-info`,
                },
              },
              {
                action: {
                  label: 'Branding',
                  actionId: `nav:/apps/${query.appid}/branding`,
                },
              },
              {
                action: {
                  label: 'App features',
                  actionId: `nav:/apps/${query.appid}/app-features`,
                },
              },
              {
                action: {
                  label: 'Permissions',
                  actionId: `nav:/apps/${query.appid}/permissions`,
                },
              },
              {
                action: {
                  label: 'Single sign-on',
                  actionId: `nav:/apps/${query.appid}/sso`,
                },
              },
              {
                action: {
                  label: 'Languages',
                  actionId: `nav:/apps/${query.appid}/languages`,
                },
              },
              {
                action: {
                  label: 'Domains',
                  actionId: `nav:/apps/${query.appid}/domains`,
                },
              },
            ],
          },
          {
            label: 'Advanced',
            actionId: 'app:advanced',
            menu: [
              {
                action: {
                  label: 'Owners',
                  actionId: `nav:/apps/${query.appid}/owners`,
                },
              },
              {
                action: {
                  label: 'App content',
                  actionId: `nav:/apps/${query.appid}/app-content`,
                },
              },
              {
                action: {
                  label: 'Environments',
                  actionId: `nav:/apps/${query.appid}/environments`,
                },
              },
              {
                action: {
                  label: 'Plans and pricing',
                  actionId: `nav:/apps/${query.appid}/plans-and-pricing`,
                },
              },
              {
                action: {
                  label: 'Admin settings',
                  actionId: `nav:/apps/${query.appid}/admin-settings`,
                },
              },
              {
                action: {
                  label: 'First party settings',
                  actionId: `nav:/apps/${query.appid}/first-party-settings`,
                },
              },
            ],
          },
          {
            label: 'Publish',
            actionId: 'app:publish',
            menu: [
              {
                action: {
                  label: 'App package',
                  actionId: `nav:/apps/${query.appid}/app-package`,
                },
              },
              {
                action: {
                  label: 'Flights',
                  actionId: `nav:/apps/${query.appid}/flights`,
                },
              },
              {
                action: {
                  label: 'Publish to org',
                  actionId: `nav:/apps/${query.appid}/publish-to-org`,
                },
              },
              {
                action: {
                  label: 'Publish to store',
                  actionId: `nav:/apps/${query.appid}/publish-to-store`,
                },
              },
            ],
          },
        ],
      }
    default:
      return {
        title: 'Dev portal',
        defaultActiveItem: `nav:${pathname}`,
        menu: [
          {
            action: {
              actionId: 'nav:/',
              icon: 'home',
              label: 'Home',
              variant: 'subtle' as 'subtle',
            },
          },
          {
            action: {
              actionId: 'nav:/apps',
              icon: 'apps',
              label: 'Apps',
              variant: 'subtle' as 'subtle',
            },
          },
          {
            action: {
              actionId: 'nav:/tools',
              icon: 'wrench',
              label: 'Tools',
              variant: 'subtle' as 'subtle',
            },
          },
        ],
      }
  }
}
