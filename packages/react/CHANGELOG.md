# @fluent-blocks/react

## 9.2.0-next.2

### Minor Changes

- [#135](https://github.com/OfficeDev/fluent-blocks/pull/135) [`db5967f`](https://github.com/OfficeDev/fluent-blocks/commit/db5967f5edc1b4ac6f1dba40f7fdc17be682de36) Thanks [@thure](https://github.com/thure)! - Add cornerActions to Sidebar, which can be used to add upward/backward navigation to the sidebar.

### Patch Changes

- [#135](https://github.com/OfficeDev/fluent-blocks/pull/135) [`db5967f`](https://github.com/OfficeDev/fluent-blocks/commit/db5967f5edc1b4ac6f1dba40f7fdc17be682de36) Thanks [@thure](https://github.com/thure)! - Update basic-icons dependencies. Change bundled icon size to only 20px. Fix all icon sizes in Fluent Blocks React to 20px.

- Updated dependencies [[`db5967f`](https://github.com/OfficeDev/fluent-blocks/commit/db5967f5edc1b4ac6f1dba40f7fdc17be682de36), [`db5967f`](https://github.com/OfficeDev/fluent-blocks/commit/db5967f5edc1b4ac6f1dba40f7fdc17be682de36)]:
  - @fluent-blocks/schemas@9.2.0-next.2
  - @fluent-blocks/basic-icons@9.1.3-next.1

## 9.2.0-next.1

### Patch Changes

- [#137](https://github.com/OfficeDev/fluent-blocks/pull/137) [`12e4c78`](https://github.com/OfficeDev/fluent-blocks/commit/12e4c7823bb31c8587764b960407a377c572f6c5) Thanks [@thure](https://github.com/thure)! - Fix React deps to specify support for jsx-runtime.

## 9.2.0-next.0

### Minor Changes

- [#120](https://github.com/OfficeDev/fluent-blocks/pull/120) [`ec59bfe`](https://github.com/OfficeDev/fluent-blocks/commit/ec59bfe5bed9662f9ef054b26ce5d0ac806fbfbf) Thanks [@thure](https://github.com/thure)! - Improve the ontology for Topbar and Sidebar; Topbar now supports a menu on its `far` prop, and Sidebar now uses an implicit Accordion and expects a title.

* [#128](https://github.com/OfficeDev/fluent-blocks/pull/128) [`16f2d75`](https://github.com/OfficeDev/fluent-blocks/commit/16f2d75146ffd5ef4395868ae9c80b361e736a1e) Thanks [@thure](https://github.com/thure)! - Inputs now use eponymous props like all other components. Fix tests and stories. Add optional description to many inputs. Add CheckboxGroup. RadioGroup and CheckboxGroup are now implementation variants of Select. Labels and descriptions now have variants, which support the old 'visuallyHidden' pattern and may support others in the future.

- [#119](https://github.com/OfficeDev/fluent-blocks/pull/119) [`a06a4c7`](https://github.com/OfficeDev/fluent-blocks/commit/a06a4c76e67f6a783db120ecf2af6067caaa93a8) Thanks [@thure](https://github.com/thure)! - Add Topbar and Sidebar as surface-type components.

* [#136](https://github.com/OfficeDev/fluent-blocks/pull/136) [`271fb95`](https://github.com/OfficeDev/fluent-blocks/commit/271fb95e8dde0cab15f413bb25cc966f96eb30e5) Thanks [@thure](https://github.com/thure)! - Input components with values maintain their values in sessionStorage. All other inputs can select those values onAction.

- [#122](https://github.com/OfficeDev/fluent-blocks/pull/122) [`a31edc1`](https://github.com/OfficeDev/fluent-blocks/commit/a31edc18e3e3fd1390546969fb03af6025445620) Thanks [@thure](https://github.com/thure)! - Add description properties to inline elements which, if defined, renders a tooltip invoker element. Add Link element to inlines.

### Patch Changes

- [#129](https://github.com/OfficeDev/fluent-blocks/pull/129) [`eee0eb1`](https://github.com/OfficeDev/fluent-blocks/commit/eee0eb11087041a377349405bba4a787e2c68707) Thanks [@thure](https://github.com/thure)! - Fix theme resolution ahead of next v9 prerelease.

* [#116](https://github.com/OfficeDev/fluent-blocks/pull/116) [`cf7f64a`](https://github.com/OfficeDev/fluent-blocks/commit/cf7f64a39b43e31548680047840aa8c963ab3fb6) Thanks [@thure](https://github.com/thure)! - Start v9.2.0-next prereleases.

- [#131](https://github.com/OfficeDev/fluent-blocks/pull/131) [`e1482f0`](https://github.com/OfficeDev/fluent-blocks/commit/e1482f0e4f9f70a057abd535cc53ae28186c2107) Thanks [@thure](https://github.com/thure)! - Update deps.

* [#123](https://github.com/OfficeDev/fluent-blocks/pull/123) [`d28fb2a`](https://github.com/OfficeDev/fluent-blocks/commit/d28fb2aaf7b55ddb1757ae12321413bde05cf304) Thanks [@thure](https://github.com/thure)! - Fix roles for topbar and sidebar.

- [#121](https://github.com/OfficeDev/fluent-blocks/pull/121) [`e4e673b`](https://github.com/OfficeDev/fluent-blocks/commit/e4e673bb50f557be0c617ca5c9f1410370e28548) Thanks [@thure](https://github.com/thure)! - Fix strict peers.

* [#130](https://github.com/OfficeDev/fluent-blocks/pull/130) [`387d7c9`](https://github.com/OfficeDev/fluent-blocks/commit/387d7c967e294caffd9f1164222e14f110cd59f8) Thanks [@thure](https://github.com/thure)! - Update dependencies.

* Updated dependencies [[`cf7f64a`](https://github.com/OfficeDev/fluent-blocks/commit/cf7f64a39b43e31548680047840aa8c963ab3fb6), [`ec59bfe`](https://github.com/OfficeDev/fluent-blocks/commit/ec59bfe5bed9662f9ef054b26ce5d0ac806fbfbf), [`16f2d75`](https://github.com/OfficeDev/fluent-blocks/commit/16f2d75146ffd5ef4395868ae9c80b361e736a1e), [`a06a4c7`](https://github.com/OfficeDev/fluent-blocks/commit/a06a4c76e67f6a783db120ecf2af6067caaa93a8), [`271fb95`](https://github.com/OfficeDev/fluent-blocks/commit/271fb95e8dde0cab15f413bb25cc966f96eb30e5), [`e4e673b`](https://github.com/OfficeDev/fluent-blocks/commit/e4e673bb50f557be0c617ca5c9f1410370e28548), [`16f2d75`](https://github.com/OfficeDev/fluent-blocks/commit/16f2d75146ffd5ef4395868ae9c80b361e736a1e), [`a31edc1`](https://github.com/OfficeDev/fluent-blocks/commit/a31edc18e3e3fd1390546969fb03af6025445620)]:
  - @fluent-blocks/colors@9.1.1-next.0
  - @fluent-blocks/basic-icons@9.1.3-next.0
  - @fluent-blocks/schemas@9.2.0-next.0

## 9.1.3

### Patch Changes

- Updated dependencies [[`18a2463`](https://github.com/OfficeDev/fluent-blocks/commit/18a246334614d8b655a1bfc024884cc962472a77)]:
  - @fluent-blocks/basic-icons@9.1.2

## 9.1.2

### Patch Changes

- Updated dependencies [[`7ef0ddd`](https://github.com/OfficeDev/fluent-blocks/commit/7ef0ddd8721946a7d62078fbcdf6c33d26f89d76)]:
  - @fluent-blocks/basic-icons@9.1.1

## 9.1.1

### Patch Changes

- [#110](https://github.com/OfficeDev/fluent-blocks/pull/110) [`328e91b`](https://github.com/OfficeDev/fluent-blocks/commit/328e91b987663f7c0d625b5d93661e24f08ce1da) Thanks [@thure](https://github.com/thure)! - Peg direct and peer deps to specific versions.

## 9.1.0

### Minor Changes

- [#106](https://github.com/OfficeDev/fluent-blocks/pull/106) [`c965fd5`](https://github.com/OfficeDev/fluent-blocks/commit/c965fd56ebb8525fa9acd394308d0659dfbe9d44) Thanks [@thure](https://github.com/thure)! - Adjust card content constituents to handle 280px viewport widths. Add 'flush' variant to Main.

* [#106](https://github.com/OfficeDev/fluent-blocks/pull/106) [`c965fd5`](https://github.com/OfficeDev/fluent-blocks/commit/c965fd56ebb8525fa9acd394308d0659dfbe9d44) Thanks [@thure](https://github.com/thure)! - Automate prereleases.

- [#106](https://github.com/OfficeDev/fluent-blocks/pull/106) [`c965fd5`](https://github.com/OfficeDev/fluent-blocks/commit/c965fd56ebb8525fa9acd394308d0659dfbe9d44) Thanks [@thure](https://github.com/thure)! - Fix no-longer-unstable import and peg to a specific version of react-components.

### Patch Changes

- [#106](https://github.com/OfficeDev/fluent-blocks/pull/106) [`c965fd5`](https://github.com/OfficeDev/fluent-blocks/commit/c965fd56ebb8525fa9acd394308d0659dfbe9d44) Thanks [@thure](https://github.com/thure)! - Make UI tests with Charts less flaky.

* [#106](https://github.com/OfficeDev/fluent-blocks/pull/106) [`c965fd5`](https://github.com/OfficeDev/fluent-blocks/commit/c965fd56ebb8525fa9acd394308d0659dfbe9d44) Thanks [@thure](https://github.com/thure)! - Add an intro to the Storybook.

- [#106](https://github.com/OfficeDev/fluent-blocks/pull/106) [`c965fd5`](https://github.com/OfficeDev/fluent-blocks/commit/c965fd56ebb8525fa9acd394308d0659dfbe9d44) Thanks [@thure](https://github.com/thure)! - Update logo.

- Updated dependencies [[`c965fd5`](https://github.com/OfficeDev/fluent-blocks/commit/c965fd56ebb8525fa9acd394308d0659dfbe9d44), [`c965fd5`](https://github.com/OfficeDev/fluent-blocks/commit/c965fd56ebb8525fa9acd394308d0659dfbe9d44), [`c965fd5`](https://github.com/OfficeDev/fluent-blocks/commit/c965fd56ebb8525fa9acd394308d0659dfbe9d44), [`c965fd5`](https://github.com/OfficeDev/fluent-blocks/commit/c965fd56ebb8525fa9acd394308d0659dfbe9d44)]:
  - @fluent-blocks/schemas@9.1.0
  - @fluent-blocks/basic-icons@9.1.0
  - @fluent-blocks/colors@9.1.0

## 9.1.0-next.4

### Minor Changes

- [#103](https://github.com/OfficeDev/fluent-blocks/pull/103) [`eb833bf`](https://github.com/OfficeDev/fluent-blocks/commit/eb833bfc1d9fe42cb6d5f5ff341257ab85959eb9) Thanks [@thure](https://github.com/thure)! - Fix no-longer-unstable import and peg to a specific version of react-components.

### Patch Changes

- [#104](https://github.com/OfficeDev/fluent-blocks/pull/104) [`7237a03`](https://github.com/OfficeDev/fluent-blocks/commit/7237a034792a446890ec837779963ee88e8d556b) Thanks [@thure](https://github.com/thure)! - Add an intro to the Storybook.

## 9.1.0-next.3

### Patch Changes

- [#100](https://github.com/OfficeDev/fluent-blocks/pull/100) [`fd67771`](https://github.com/OfficeDev/fluent-blocks/commit/fd677716a7194d60f22a4b7a07df2f5e0f5088b9) Thanks [@thure](https://github.com/thure)! - Make UI tests with Charts less flaky.

* [#97](https://github.com/OfficeDev/fluent-blocks/pull/97) [`c7d1e68`](https://github.com/OfficeDev/fluent-blocks/commit/c7d1e68f2e0b12a8ad68c7d5a26697c5dbba1e77) Thanks [@thure](https://github.com/thure)! - Update logo.

* Updated dependencies [[`c7d1e68`](https://github.com/OfficeDev/fluent-blocks/commit/c7d1e68f2e0b12a8ad68c7d5a26697c5dbba1e77), [`6d8cae3`](https://github.com/OfficeDev/fluent-blocks/commit/6d8cae381bcc38274a39817a3264a1df020f8dea)]:
  - @fluent-blocks/schemas@9.1.0-next.3
  - @fluent-blocks/colors@9.1.0-next.1

## 9.1.0-next.2

### Minor Changes

- [#95](https://github.com/OfficeDev/fluent-blocks/pull/95) [`b2690c4`](https://github.com/OfficeDev/fluent-blocks/commit/b2690c44e9bc8306544f759f702c24b92da3235f) Thanks [@thure](https://github.com/thure)! - Adjust card content constituents to handle 280px viewport widths. Add 'flush' variant to Main.

### Patch Changes

- Updated dependencies [[`b2690c4`](https://github.com/OfficeDev/fluent-blocks/commit/b2690c44e9bc8306544f759f702c24b92da3235f)]:
  - @fluent-blocks/schemas@9.1.0-next.2

## 9.1.0-next.1

### Minor Changes

- [`1502a39`](https://github.com/OfficeDev/fluent-blocks/commit/1502a39e6e225886b377b381349645e5f7763838) Thanks [@thure](https://github.com/thure)! - Automate prereleases.

### Patch Changes

- Updated dependencies [[`1502a39`](https://github.com/OfficeDev/fluent-blocks/commit/1502a39e6e225886b377b381349645e5f7763838)]:
  - @fluent-blocks/basic-icons@9.1.0-next.1
  - @fluent-blocks/schemas@9.1.0-next.1

## 9.0.0

### Major Changes

- [`7a2eef4`](https://github.com/OfficeDev/fluent-blocks/commit/7a2eef432ed5a088f8f86bfb74303fdc81e287fc) Thanks [@thure](https://github.com/thure)! - Initial release.

### Patch Changes

- Updated dependencies [[`7a2eef4`](https://github.com/OfficeDev/fluent-blocks/commit/7a2eef432ed5a088f8f86bfb74303fdc81e287fc)]:
  - @fluent-blocks/basic-icons@9.0.0
  - @fluent-blocks/schemas@9.0.0
