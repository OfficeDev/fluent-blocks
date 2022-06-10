import { createDOMRenderer, RendererProvider as IncorrectlyTypedRendererProvider } from '@griffel/react';
import { AppProps } from 'next/app'
import { FluentBlocksProvider } from '@fluent-blocks/react'
import {RendererProviderProps} from "@griffel/react/RendererContext";
import {FC, ReactElement} from "react";

const RendererProvider = IncorrectlyTypedRendererProvider as FC<RendererProviderProps & {children: ReactElement}>

const _globals = require('../styles/globals.css')

function FuibApp({ Component, pageProps, renderer }: AppProps & {renderer?: RendererProviderProps['renderer']}) {
  return (
    <RendererProvider renderer={renderer || createDOMRenderer()}>
      <FluentBlocksProvider
        themeName="light"
        accentScheme="teams"
        iconSpriteUrl="/basic-icons.svg"
      >
        <Component {...pageProps} />
      </FluentBlocksProvider>
    </RendererProvider>
  )
}

export default FuibApp
