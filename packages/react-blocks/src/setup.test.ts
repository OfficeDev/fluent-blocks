import {
  chromium as play,
  ChromiumBrowser,
  Page,
  Response,
} from 'playwright-chromium'

export type TestsContext = {
  browser: ChromiumBrowser
  page: Page
  storybookUrl: (storyId: string) => string
  warnings: string[]
  timeout: (ms: number) => void
  goto: (url: string) => Promise<Response | null | undefined>
}

type MochaHooks = {
  beforeAll: () => Promise<void>
  afterAll: () => Promise<void>
}

export const mochaHooks: MochaHooks & Partial<TestsContext> = {
  async beforeAll() {
    this.timeout && this.timeout(5e3)
    this.browser = await play.launch()
    this.page = await this.browser.newPage()
    this.goto = async function goto(this, url: string) {
      await this.page?.close()
      this.page = await this.browser?.newPage()
      return this.page?.goto(url)
    }
    this.storybookUrl = (storyId) =>
      `http://localhost:4000/iframe.html?id=${storyId}&viewMode=story`
    this.warnings = []
    console.warn = (...content) =>
      this.warnings?.push.apply(
        this.warnings,
        (content || []).map((val) => `${val}`)
      )
  },

  async afterAll() {
    await this.browser?.close()
  },
}
