/* eslint func-names: 0 */

import expect from 'expect'

describe('Short inputs', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-sis--short-inputs-json-test'))
      })
      it('renders to the page', async function () {
        expect(
          await this.page
            .locator(
              '#root button >> text=37db439e-ea0f-44b6-8fbe-61138ad48601'
            )
            .count()
        ).toEqual(1)
      })
    })
  })
})
