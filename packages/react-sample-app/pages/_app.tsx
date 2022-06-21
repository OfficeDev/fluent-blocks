import get from 'lodash/get'
import { AppProps } from 'next/app'
import { NextRouter, useRouter } from 'next/router'
import { FC, ReactElement } from 'react'

import { ActionPayload, Escape, View } from '@fluent-blocks/react'
import {
  RendererProvider as IncorrectlyTypedRendererProvider,
  createDOMRenderer,
} from '@griffel/react'
import { RendererProviderProps } from '@griffel/react/RendererContext'

import sidebarFragment from '../fragments/sidebar'
import topbarFragment from '../fragments/topbar'

const RendererProvider = IncorrectlyTypedRendererProvider as FC<
  RendererProviderProps & { children: ReactElement }
>

const _globals = require('../styles/globals.css')

function onActivate(payload: ActionPayload, router: NextRouter) {
  if ('row' in payload) {
    const dest = get(payload, 'row', '').split(':')[1]
    router.push(dest)
  }
}

function FuibApp({
  Component,
  pageProps,
  renderer,
}: AppProps & { renderer?: RendererProviderProps['renderer'] }) {
  const router = useRouter()
  return (
    <RendererProvider renderer={renderer || createDOMRenderer()}>
      <View
        themeName="light"
        accentScheme="teams"
        iconSpriteUrl="/basic-icons.svg"
        onAction={(payload) => {
          console.log('[action]', payload)
          const { actionId } = payload
          switch (actionId) {
            case 'nav:/':
              return router.push('/')
            case 'nav:/apps':
              return router.push('/apps')
            case 'nav:/tools':
              return router.push('/tools')
            case 'activate':
              return onActivate(payload, router)
          }
        }}
        sidebar={sidebarFragment(router.pathname)}
        topbar={topbarFragment(router.pathname)}
        main={{
          title: '',
          blocks: [
            <Escape key="e1" contentMeetsAccessibilityAndDesignStandards>
              <Component {...pageProps} />
            </Escape>,
          ],
        }}
      />
    </RendererProvider>
  )
}

export default FuibApp
