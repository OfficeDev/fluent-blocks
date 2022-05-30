/* eslint func-names: 0 */
import expect from 'expect'

describe('Toolbar', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-toolbar--toolbar-json-test'))
      })
      it('renders to the page and hides content that can’t fit', async function () {
        expect(
          await this.page.locator('#root button[id="51e6eeb9"]').isVisible()
        ).toBeTruthy()
        expect(
          await this.page.locator('#root button[id="b3ccb472"]').isVisible()
        ).toBeFalsy()
      })
    })
  })
})
