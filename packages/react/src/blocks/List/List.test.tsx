/* eslint func-names: 0 */
import expect from 'expect'

describe('List', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-list--list-json-test'))
      })

      it('renders to the page', async function () {
        expect(
          await this.page
            .locator(
              '#root [role="grid"] [role="row"][aria-labelledby="rh__9431bd8f-9241-4385-8f87-ca26e477cf1b"] >> text=0ec19628-108d-4834-937d-2a941599dc19'
            )
            .count()
        ).toEqual(1)
      })
    })
  })
})
