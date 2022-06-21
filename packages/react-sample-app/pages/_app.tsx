import get from 'lodash/get'
import pick from 'lodash/pick'
import { AppProps } from 'next/app'
import { NextRouter, useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

import { ActionPayload, Escape, View } from '@fluent-blocks/react'
import {
  RendererProvider as IncorrectlyTypedRendererProvider,
  SSRProvider as IncorrectlyTypedSSRProvider,
  createDOMRenderer,
} from '@fluentui/react-components'
import { RendererProviderProps } from '@griffel/react/RendererContext'

import sidebarFragment from '../fragments/sidebar'
import topbarFragment from '../fragments/topbar'

const RendererProvider = IncorrectlyTypedRendererProvider as FC<
  PropsWithChildren<RendererProviderProps>
>

const SSRProvider = IncorrectlyTypedSSRProvider as FC<PropsWithChildren<{}>>

const _globals = require('../styles/globals.css')

function onActivate(payload: ActionPayload, router: NextRouter) {
  if ('row' in payload) {
    const action = get(payload, 'row', '').split(':')
    if (action[0] === 'nav') {
      router.push(action[1])
    }
  }
}

function FuibApp({
  Component,
  pageProps,
  renderer,
}: AppProps & { renderer?: RendererProviderProps['renderer'] }) {
  const router = useRouter()
  const fragmentProps = pick(router, ['pathname', 'query'])
  return (
    <RendererProvider renderer={renderer || createDOMRenderer()}>
      <SSRProvider>
        <View
          themeName="light"
          accentScheme="teams"
          iconSpriteUrl="/basic-icons.svg"
          onAction={(payload) => {
            console.log('[action]', payload)
            const { actionId } = payload
            const action = actionId.split(':')
            switch (action[0]) {
              case 'nav':
                return router.push(action[1])
              case 'activate':
                return onActivate(payload, router)
            }
          }}
          sidebar={sidebarFragment(fragmentProps)}
          topbar={topbarFragment(fragmentProps)}
          main={{
            title: '',
            blocks: [
              <Escape key="e1" contentMeetsAccessibilityAndDesignStandards>
                <Component {...pageProps} />
              </Escape>,
            ],
          }}
        />
      </SSRProvider>
    </RendererProvider>
  )
}

export default FuibApp
