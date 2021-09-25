import { chromium as play } from 'playwright-chromium'
import { TestsContext } from './lib/TestsContext'

type MochaHooks = {
  beforeAll: () => Promise<void>
  afterAll: () => Promise<void>
}

export const mochaHooks: MochaHooks & Partial<TestsContext> = {
  async beforeAll() {
    this.browser = await play.launch()
    this.page = await this.browser.newPage()
    this.storybookUrl = (storyId) =>
      `http://localhost:4000/iframe.html?id=${storyId}&viewMode=story`
  },

  async afterAll() {
    await this.browser?.close()
  },
}
