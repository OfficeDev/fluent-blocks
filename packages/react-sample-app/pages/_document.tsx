import { createDOMRenderer, renderToStyleElements } from '@griffel/react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document';
import {
  AppContextType, AppInitialProps, AppPropsType,
  NextComponentType
} from "next/dist/shared/lib/utils";

class FuibDocument extends Document {
  public static async getInitialProps(ctx: DocumentContext) {
    // 👇 creates a renderer
    const renderer = createDOMRenderer();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: NextComponentType<AppContextType, AppInitialProps, AppPropsType & {renderer?: any}>) => props => <App {...props} renderer={renderer} />,
      });

    const initialProps = await Document.getInitialProps(ctx);
    const styles = renderToStyleElements(renderer);

    return {
      ...initialProps,
      // 👇 adding our styles elements to output
      styles: [...(Array.isArray(initialProps.styles) ? initialProps.styles : []), ...styles],
    };
  }

  public render() {
    return (
      <Html>
        <Head />
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

export default FuibDocument
