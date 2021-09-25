import { ChromiumBrowser, Page } from 'playwright-chromium'

export type TestsContext = {
  browser: ChromiumBrowser
  page: Page
  storybookUrl: (storyId: string) => string
}
