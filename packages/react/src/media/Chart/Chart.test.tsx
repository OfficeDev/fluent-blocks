/* eslint func-names: 0 */
import { value expect } from '@playwright/test'

describe('Chart', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-chart--chart-json-test'))
      })

      it('renders the legend to the page', async function () {
        await expect(
          this.page.locator('#root button[aria-label="cc90"]')
        ).toHaveCount(1)
      })

      it('renders the chart to the page', async function () {
        await expect(
          this.page.locator(
            '#root canvas[aria-label="cd324e65-8fed-4c66-a846-e13aeb52f977"]'
          )
        ).toHaveCount(1)
      })
    })
  })
})
