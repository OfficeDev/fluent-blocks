/* eslint func-names: 0 */

import expect from 'expect'

describe('Chart', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-chart--chart-json-test'))
      })

      it('renders the legend to the page', async function () {
        expect(
          await this.page.locator('#root button[aria-label="cc90"]').count()
        ).toEqual(1)
      })

      it('renders the chart to the page', async function () {
        expect(
          await this.page
            .locator(
              '#root canvas[aria-label="cd324e65-8fed-4c66-a846-e13aeb52f977"]'
            )
            .count()
        ).toEqual(1)
      })
    })
  })
})
