/* eslint func-names: 0 */

import expect from 'expect'

describe('Paragraph', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props the structured way', function () {
      before(async function () {
        await this.goto(
          this.storybookUrl('tests-paragraph--paragraph-json-1-test')
        )
      })

      it('renders to the page', async function () {
        expect(await this.page.locator('#root p').first().innerText()).toEqual(
          '386b63ae-db03-41c3-b40b-bb4658cd1dfc'
        )
      })
    })

    describe('using serializeable props as an array of strings', function () {
      before(async function () {
        await this.goto(
          this.storybookUrl('tests-paragraph--paragraph-json-2-test')
        )
      })

      it('renders to the page', async function () {
        expect(await this.page.locator('#root p').first().innerText()).toEqual(
          '0a874649-8283-4300-8b7e-3be36da8ae47'
        )
      })
    })

    describe('using serializeable props as a bare string', function () {
      before(async function () {
        await this.goto(
          this.storybookUrl('tests-paragraph--paragraph-json-3-test')
        )
      })

      it('renders to the page', async function () {
        expect(await this.page.locator('#root p').first().innerText()).toEqual(
          'e153a016-f0ce-4e1c-8f70-d2216c8de26f'
        )
      })
    })

    describe('using JSX', function () {
      before(async function () {
        await this.goto(
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
      before(async function () {
        await this.goto(
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
})
