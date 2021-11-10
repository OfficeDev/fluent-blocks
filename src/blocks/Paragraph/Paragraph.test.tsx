/* eslint func-names: 0 */

import expect from 'expect'

describe('Paragraph: interactions', function () {
  this.timeout(5e3)
  describe('using serializeable props', function () {
    before(async function (this) {
      await this.page.goto(
        this.storybookUrl('tests-paragraph--paragraph-json-test')
      )
    })

    it('renders to the page', async function () {
      expect(await this.page.locator('#root p').first().innerText()).toEqual(
        '386b63ae-db03-41c3-b40b-bb4658cd1dfc'
      )
    })
  })

  describe('using JSX', function () {
    before(async function (this) {
      await this.page.goto(
        this.storybookUrl('tests-paragraph--paragraph-jsx-test')
      )
    })

    it('renders to the page', async function () {
      expect(await this.page.locator('#root p').first().innerText()).toEqual(
        '29b23c46-1883-4d7f-90a3-58ece7bf2f1c'
      )
    })
  })

  describe('using `Escape`', function () {
    before(async function (this) {
      await this.page.goto(
        this.storybookUrl('tests-paragraph--paragraph-escape-test')
      )
    })

    it('renders escaped content to the page', async function () {
      expect(
        await this.page
          .locator('text=f37a1350-622b-422b-b306-9bd342d67779')
          .count()
      ).toEqual(1)
    })
  })
})
