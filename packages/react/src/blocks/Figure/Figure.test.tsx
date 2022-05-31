/* eslint func-names: 0 */
import { value expect } from '@playwright/test'

describe('Figure', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-figure--figure-json-test'))
      })
      it('renders to the page', async function () {
        await expect(
          this.page.locator(
            '#root figure img[alt="0c9c1a2c-f75c-4a03-a2eb-a84a097ea33d"]'
          )
        ).toHaveCount(1)
        await expect(
          this.page.locator(
            '#root figcaption >> text=56fe5be3-ad5a-481e-b971-cab910f1c99b'
          )
        ).toHaveCount(1)
      })
    })
  })
})
