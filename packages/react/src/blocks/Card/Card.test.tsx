/* eslint func-names: 0 */
import { expect } from '@playwright/test'

describe('Card', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-card--card-json-test'))
      })
      it('renders to the page', async function () {
        await expect(
          this.page.locator(
            '#root div[role="group"] >> text=eafa9885-7c39-4255-8289-06cb0f5f509f'
          )
        ).toHaveCount(1)
      })
    })
    describe('using JSX props', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-card--card-jsx-test'))
      })
      it('renders to the page', async function () {
        await expect(
          this.page.locator(
            '#root div[role="group"] >> text=7dc865ac-d474-408f-a522-9189ce1ccbe5'
          )
        ).toHaveCount(1)
      })
    })
    describe('using `Escape`', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-card--card-escape-test'))
      })
      it('renders to the page', async function () {
        await expect(
          this.page.locator(
            '#root div[role="group"] >> text=dea8bcd5-e9d0-488e-9974-eae698606b93'
          )
        ).toHaveCount(1)
      })
    })
  })
})
