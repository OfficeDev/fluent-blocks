/* eslint func-names: 0 */

import expect from 'expect'

describe('Table', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-table--table-json-test'))
      })

      it('renders to the page', async function () {
        expect(
          await this.page
            .locator(
              '#root [role="grid"] >> text=7151084f-3323-408a-be7e-c96387020bfe'
            )
            .count()
        ).toEqual(1)
      })
    })
  })
})
