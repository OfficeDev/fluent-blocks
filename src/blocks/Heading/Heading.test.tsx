/* eslint func-names: 0 */

import expect from 'expect'

describe('Heading', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function (this) {
        await this.goto(this.storybookUrl('tests-heading--heading-json-test'))
      })

      it('renders to the page', async function () {
        expect(await this.page.locator('#root h1').first().innerText()).toEqual(
          'a2c49d93-b303-48e9-a623-bb97b601e8f3'
        )
      })
    })

    describe('using JSX', function () {
      before(async function (this) {
        await this.goto(this.storybookUrl('tests-heading--heading-jsx-test'))
      })

      it('renders to the page', async function () {
        expect(await this.page.locator('#root h2').first().innerText()).toEqual(
          'cf22cf49-06d9-400d-8ae8-c086059bf8f7'
        )
      })
    })

    describe('using `Escape`', function () {
      before(async function (this) {
        await this.goto(this.storybookUrl('tests-heading--heading-escape-test'))
      })

      it('renders escaped content to the page', async function () {
        expect(await this.page.locator('#root h3').first().innerText()).toEqual(
          '21b6d9a7-4941-458f-b69a-fc5ec4bdd9d0'
        )
      })
    })
  })
})
