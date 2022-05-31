/* eslint func-names: 0 */
import { value expect } from '@playwright/test'

describe('Tabs', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props the structured way', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-tabs--tabs-json-test'))
      })

      it('renders to the page', async function () {
        await expect(
          this.page.locator(
            '#root [aria-label="233277a1-f1da-405a-8f39-369b7519b0ee"] button[role="tab"] >> text=82564647-4a86-4f7e-800c-0b65dba46866'
          )
        ).toHaveCount(1)
        await expect(
          this.page.locator(
            '#root [aria-label="233277a1-f1da-405a-8f39-369b7519b0ee"] [role="tabpanel"] >> text=af0cc026-7a92-4922-8386-ad563019a77a'
          )
        ).toHaveCount(1)
      })

      it('moves focus and switches tabs correctly for keyboard users')
    })

    describe('using JSX', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-tabs--tabs-jsx-test'))
      })

      it('renders to the page', async function () {
        await expect(
          this.page.locator(
            '#root [aria-label="8fda3bd1-0f5c-4ac0-ab17-f58a09216c59"] button[role="tab"] >> text=b520d24b-6bbe-41ee-9dc7-3d545a74252e'
          )
        ).toHaveCount(1)
        await expect(
          this.page.locator(
            '#root [aria-label="8fda3bd1-0f5c-4ac0-ab17-f58a09216c59"] [role="tabpanel"] >> text=a5ebd0ef-4a35-47a5-a395-8930fdab7faa'
          )
        ).toHaveCount(1)
      })
    })

    describe('using `Escape`', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-tabs--tabs-escape-test'))
      })

      it('renders escaped content to the page', async function () {
        await expect(
          this.page.locator(
            '#root [aria-label="52738fcb-6aee-4fed-87de-85400ad80364"] [role="tabpanel"] >> text=0547fd7b-7ba7-4d32-8830-b3212de9d496'
          )
        ).toHaveCount(1)
      })
    })
  })
})
