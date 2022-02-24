/* eslint func-names: 0 */

import expect from 'expect'
import renderer from 'react-test-renderer'
import get from 'lodash/get'
import { Section } from './Section'
import { Text as ExpectedText, Icon as ExpectedIcon } from '../../inlines'
import { Escape } from '../../lib'

const Text = ({ text }: { text: string }) => <span>{text}</span>

describe('Section', function () {
  describe('unit tests', function () {
    it('accepts JSON props', async function () {
      const section = renderer
        .create(
          <Section
            title={[{ text: 'Title' }, { icon: 'animal_cat' }]}
            abstract={[{ text: 'Abstract' }, { icon: 'diversity' }]}
          />
        )
        .toJSON()

      expect(get(section, ['children', 0, 'type'], 'not present')).toEqual('h2')
    })

    it('accepts JSX props', async function () {
      const section = renderer
        .create(
          <Section
            title={[
              <ExpectedText
                text="9aa37e16-99b8-4f01-9cc4-ab773c3640e9"
                key="t1"
              />,
              <ExpectedIcon icon="animal_cat" key="t2" />,
            ]}
            abstract={[
              <ExpectedText
                text="97718842-fdf6-4ea3-9245-cb32bfb1daa4"
                key="t1"
              />,
              <ExpectedIcon icon="diversity" key="t2" />,
            ]}
          />
        )
        .toJSON()

      expect(
        get(section, ['children', 0, 'children', 0], 'not present')
      ).toEqual('9aa37e16-99b8-4f01-9cc4-ab773c3640e9')
      expect(
        get(section, ['children', 1, 'children', 0], 'not present')
      ).toEqual('97718842-fdf6-4ea3-9245-cb32bfb1daa4')
    })

    it('will not accept unexpected arbitrary JSX content', async function () {
      const nWarnings = this.warnings.length
      const section = renderer
        .create(
          <Section
            title={[
              <Text text="a2389698-50d0-46e5-93f7-e991e32b003c" key="t1" />,
            ]}
          />
        )
        .toJSON()

      expect(
        get(section, ['children', 0, 'children', 0], 'not present')
      ).toEqual('not present')

      expect(this.warnings.length).toBeGreaterThan(nWarnings)
    })

    it('will accept arbitrary JSX content inside Escape', async function () {
      const nWarnings = this.warnings.length
      const section = renderer
        .create(
          <Section
            title={[
              <Escape contentMeetsAccessibilityAndDesignStandards key="t1">
                <span>b3e52f54-5ecb-47a1-9418-001a241a00fc</span>
              </Escape>,
            ]}
          />
        )
        .toJSON()

      expect(
        get(
          section,
          ['children', 0, 'children', 0, 'children', 0],
          'not present'
        )
      ).toEqual('b3e52f54-5ecb-47a1-9418-001a241a00fc')

      expect(this.warnings.length).toBeGreaterThan(nWarnings)
    })
  })

  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-section--section-json-test'))
      })

      it('renders to the page', async function () {
        expect(
          await this.page
            .locator('text=451e7cfb-23ce-408a-8d5a-75970be8c530')
            .count()
        ).toEqual(1)
        expect(
          await this.page
            .locator('text=aca0c8ba-b43c-4e9f-b554-960ac12b4633')
            .count()
        ).toEqual(1)
      })
    })

    describe('using JSX', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-section--section-jsx-test'))
      })

      it('renders to the page', async function () {
        expect(
          await this.page
            .locator('text=fc1aece1-c6e0-4285-a37b-58382132fd6f')
            .count()
        ).toEqual(1)
        expect(
          await this.page
            .locator('text=fa3ac1fc-1976-459e-9a6e-1b69315cd7be')
            .count()
        ).toEqual(1)
      })
    })

    describe('using `Escape`', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-section--section-escape-test'))
      })

      it('renders escaped content to the page', async function () {
        expect(
          await this.page
            .locator('text=8e86641e-3efc-472c-bcb1-a7d74c1080fc')
            .count()
        ).toEqual(1)
      })
    })
  })
})
