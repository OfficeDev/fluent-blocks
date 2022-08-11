# @fluent-blocks/schemas

## 9.3.0-next.9

### Minor Changes

- [#182](https://github.com/OfficeDev/fluent-blocks/pull/182) [`42ea784`](https://github.com/OfficeDev/fluent-blocks/commit/42ea7842dc55680fe2fb00b25ffef939a25bb365) Thanks [@thure](https://github.com/thure)! - Add validation messages and required/optional signaling to inputs.

## 9.3.0-next.8

### Patch Changes

- [#183](https://github.com/OfficeDev/fluent-blocks/pull/183) [`fd9a5b7`](https://github.com/OfficeDev/fluent-blocks/commit/fd9a5b7841647d2ef14b53d55508ba5d89de07aa) Thanks [@thure](https://github.com/thure)! - Permit described inline sequences for table body cell and header cell content.

## 9.3.0-next.7

### Patch Changes

- [#180](https://github.com/OfficeDev/fluent-blocks/pull/180) [`2f3c36b`](https://github.com/OfficeDev/fluent-blocks/commit/2f3c36bfecc681d2f19fd8f0a22ce4e90b2c5e28) Thanks [@thure](https://github.com/thure)! - Fixed DescriptionList’s types. Also adjust props for Layout and add sizeVariant prop to DescriptionList.

## 9.3.0-next.3

### Minor Changes

- [#172](https://github.com/OfficeDev/fluent-blocks/pull/172) [`e5d34b7`](https://github.com/OfficeDev/fluent-blocks/commit/e5d34b72f240ed0692c1adb0da26a7b9b68f3cfd) Thanks [@thure](https://github.com/thure)! - Add Avatars as a type of Inline element.

## 9.3.0-next.2

### Minor Changes

- [#170](https://github.com/OfficeDev/fluent-blocks/pull/170) [`322df38`](https://github.com/OfficeDev/fluent-blocks/commit/322df38fe9a8c4b4d1e549384438d5e479638fb7) Thanks [@thure](https://github.com/thure)! - Add Loading as media variant, icon, and special state for Table and List.

## 9.3.0-next.1

### Minor Changes

- [#163](https://github.com/OfficeDev/fluent-blocks/pull/163) [`7b19f85`](https://github.com/OfficeDev/fluent-blocks/commit/7b19f8569cd4908242cfbe1cbaab84844d14c8db) Thanks [@thure](https://github.com/thure)! - Adds support for Text variants, and uses the subtle variant for input descriptions.

## 9.3.0-next.0

### Minor Changes

- [#161](https://github.com/OfficeDev/fluent-blocks/pull/161) [`ebb1866`](https://github.com/OfficeDev/fluent-blocks/commit/ebb18667590840f91cc9a0b1070f061055a9c0e0) Thanks [@thure](https://github.com/thure)! - Add 'addable' to option props, which instructs multiple Selects which other options are added automatically when another option is added.

## 9.2.0

### Minor Changes

- [#142](https://github.com/OfficeDev/fluent-blocks/pull/142) [`86a3417`](https://github.com/OfficeDev/fluent-blocks/commit/86a341788aea6d2456345ae24bcd7738b0052e0a) Thanks [@thure](https://github.com/thure)! - Change Sidebar to use initialActiveItem. Allow initialValue(s) to programmatically change input state.

* [#120](https://github.com/OfficeDev/fluent-blocks/pull/120) [`ec59bfe`](https://github.com/OfficeDev/fluent-blocks/commit/ec59bfe5bed9662f9ef054b26ce5d0ac806fbfbf) Thanks [@thure](https://github.com/thure)! - Improve the ontology for Topbar and Sidebar; Topbar now supports a menu on its `far` prop, and Sidebar now uses an implicit Accordion and expects a title.

- [#128](https://github.com/OfficeDev/fluent-blocks/pull/128) [`16f2d75`](https://github.com/OfficeDev/fluent-blocks/commit/16f2d75146ffd5ef4395868ae9c80b361e736a1e) Thanks [@thure](https://github.com/thure)! - Inputs now use eponymous props like all other components. Fix tests and stories. Add optional description to many inputs. Add CheckboxGroup. RadioGroup and CheckboxGroup are now implementation variants of Select. Labels and descriptions now have variants, which support the old 'visuallyHidden' pattern and may support others in the future.

* [#119](https://github.com/OfficeDev/fluent-blocks/pull/119) [`a06a4c7`](https://github.com/OfficeDev/fluent-blocks/commit/a06a4c76e67f6a783db120ecf2af6067caaa93a8) Thanks [@thure](https://github.com/thure)! - Add Topbar and Sidebar as surface-type components.

- [#135](https://github.com/OfficeDev/fluent-blocks/pull/135) [`db5967f`](https://github.com/OfficeDev/fluent-blocks/commit/db5967f5edc1b4ac6f1dba40f7fdc17be682de36) Thanks [@thure](https://github.com/thure)! - Add cornerActions to Sidebar, which can be used to add upward/backward navigation to the sidebar.

* [#136](https://github.com/OfficeDev/fluent-blocks/pull/136) [`271fb95`](https://github.com/OfficeDev/fluent-blocks/commit/271fb95e8dde0cab15f413bb25cc966f96eb30e5) Thanks [@thure](https://github.com/thure)! - Input components with values maintain their values in sessionStorage. All other inputs can select those values onAction.

- [#122](https://github.com/OfficeDev/fluent-blocks/pull/122) [`a31edc1`](https://github.com/OfficeDev/fluent-blocks/commit/a31edc18e3e3fd1390546969fb03af6025445620) Thanks [@thure](https://github.com/thure)! - Add description properties to inline elements which, if defined, renders a tooltip invoker element. Add Link element to inlines.

### Patch Changes

- [#116](https://github.com/OfficeDev/fluent-blocks/pull/116) [`cf7f64a`](https://github.com/OfficeDev/fluent-blocks/commit/cf7f64a39b43e31548680047840aa8c963ab3fb6) Thanks [@thure](https://github.com/thure)! - Start v9.2.0-next prereleases.

* [#154](https://github.com/OfficeDev/fluent-blocks/pull/154) [`abb3da1`](https://github.com/OfficeDev/fluent-blocks/commit/abb3da1e68c487010ef292c82f3a983befda3924) Thanks [@thure](https://github.com/thure)! - Improve documentation. Export everything from colors package. Add dark mode image to READMEs.

- [#121](https://github.com/OfficeDev/fluent-blocks/pull/121) [`e4e673b`](https://github.com/OfficeDev/fluent-blocks/commit/e4e673bb50f557be0c617ca5c9f1410370e28548) Thanks [@thure](https://github.com/thure)! - Fix strict peers.

- Updated dependencies [[`cf7f64a`](https://github.com/OfficeDev/fluent-blocks/commit/cf7f64a39b43e31548680047840aa8c963ab3fb6), [`abb3da1`](https://github.com/OfficeDev/fluent-blocks/commit/abb3da1e68c487010ef292c82f3a983befda3924), [`e4e673b`](https://github.com/OfficeDev/fluent-blocks/commit/e4e673bb50f557be0c617ca5c9f1410370e28548)]:
  - @fluent-blocks/colors@9.2.0

## 9.2.0-next.9

### Patch Changes

- [#154](https://github.com/OfficeDev/fluent-blocks/pull/154) [`abb3da1`](https://github.com/OfficeDev/fluent-blocks/commit/abb3da1e68c487010ef292c82f3a983befda3924) Thanks [@thure](https://github.com/thure)! - Improve documentation. Export everything from colors package. Add dark mode image to READMEs.

- Updated dependencies [[`abb3da1`](https://github.com/OfficeDev/fluent-blocks/commit/abb3da1e68c487010ef292c82f3a983befda3924)]:
  - @fluent-blocks/colors@9.2.0-next.1

## 9.2.0-next.3

### Minor Changes

- [#142](https://github.com/OfficeDev/fluent-blocks/pull/142) [`86a3417`](https://github.com/OfficeDev/fluent-blocks/commit/86a341788aea6d2456345ae24bcd7738b0052e0a) Thanks [@thure](https://github.com/thure)! - Change Sidebar to use initialActiveItem. Allow initialValue(s) to programmatically change input state.

## 9.2.0-next.2

### Minor Changes

- [#135](https://github.com/OfficeDev/fluent-blocks/pull/135) [`db5967f`](https://github.com/OfficeDev/fluent-blocks/commit/db5967f5edc1b4ac6f1dba40f7fdc17be682de36) Thanks [@thure](https://github.com/thure)! - Add cornerActions to Sidebar, which can be used to add upward/backward navigation to the sidebar.

## 9.2.0-next.0

### Minor Changes

- [#120](https://github.com/OfficeDev/fluent-blocks/pull/120) [`ec59bfe`](https://github.com/OfficeDev/fluent-blocks/commit/ec59bfe5bed9662f9ef054b26ce5d0ac806fbfbf) Thanks [@thure](https://github.com/thure)! - Improve the ontology for Topbar and Sidebar; Topbar now supports a menu on its `far` prop, and Sidebar now uses an implicit Accordion and expects a title.

* [#128](https://github.com/OfficeDev/fluent-blocks/pull/128) [`16f2d75`](https://github.com/OfficeDev/fluent-blocks/commit/16f2d75146ffd5ef4395868ae9c80b361e736a1e) Thanks [@thure](https://github.com/thure)! - Inputs now use eponymous props like all other components. Fix tests and stories. Add optional description to many inputs. Add CheckboxGroup. RadioGroup and CheckboxGroup are now implementation variants of Select. Labels and descriptions now have variants, which support the old 'visuallyHidden' pattern and may support others in the future.

- [#119](https://github.com/OfficeDev/fluent-blocks/pull/119) [`a06a4c7`](https://github.com/OfficeDev/fluent-blocks/commit/a06a4c76e67f6a783db120ecf2af6067caaa93a8) Thanks [@thure](https://github.com/thure)! - Add Topbar and Sidebar as surface-type components.

* [#136](https://github.com/OfficeDev/fluent-blocks/pull/136) [`271fb95`](https://github.com/OfficeDev/fluent-blocks/commit/271fb95e8dde0cab15f413bb25cc966f96eb30e5) Thanks [@thure](https://github.com/thure)! - Input components with values maintain their values in sessionStorage. All other inputs can select those values onAction.

- [#122](https://github.com/OfficeDev/fluent-blocks/pull/122) [`a31edc1`](https://github.com/OfficeDev/fluent-blocks/commit/a31edc18e3e3fd1390546969fb03af6025445620) Thanks [@thure](https://github.com/thure)! - Add description properties to inline elements which, if defined, renders a tooltip invoker element. Add Link element to inlines.

### Patch Changes

- [#116](https://github.com/OfficeDev/fluent-blocks/pull/116) [`cf7f64a`](https://github.com/OfficeDev/fluent-blocks/commit/cf7f64a39b43e31548680047840aa8c963ab3fb6) Thanks [@thure](https://github.com/thure)! - Start v9.2.0-next prereleases.

* [#121](https://github.com/OfficeDev/fluent-blocks/pull/121) [`e4e673b`](https://github.com/OfficeDev/fluent-blocks/commit/e4e673bb50f557be0c617ca5c9f1410370e28548) Thanks [@thure](https://github.com/thure)! - Fix strict peers.

* Updated dependencies [[`cf7f64a`](https://github.com/OfficeDev/fluent-blocks/commit/cf7f64a39b43e31548680047840aa8c963ab3fb6), [`e4e673b`](https://github.com/OfficeDev/fluent-blocks/commit/e4e673bb50f557be0c617ca5c9f1410370e28548)]:
  - @fluent-blocks/colors@9.1.1-next.0

## 9.1.0

### Minor Changes

- [#106](https://github.com/OfficeDev/fluent-blocks/pull/106) [`c965fd5`](https://github.com/OfficeDev/fluent-blocks/commit/c965fd56ebb8525fa9acd394308d0659dfbe9d44) Thanks [@thure](https://github.com/thure)! - Adjust card content constituents to handle 280px viewport widths. Add 'flush' variant to Main.

* [#106](https://github.com/OfficeDev/fluent-blocks/pull/106) [`c965fd5`](https://github.com/OfficeDev/fluent-blocks/commit/c965fd56ebb8525fa9acd394308d0659dfbe9d44) Thanks [@thure](https://github.com/thure)! - Automate prereleases.

### Patch Changes

- [#106](https://github.com/OfficeDev/fluent-blocks/pull/106) [`c965fd5`](https://github.com/OfficeDev/fluent-blocks/commit/c965fd56ebb8525fa9acd394308d0659dfbe9d44) Thanks [@thure](https://github.com/thure)! - Update logo.

- Updated dependencies [[`c965fd5`](https://github.com/OfficeDev/fluent-blocks/commit/c965fd56ebb8525fa9acd394308d0659dfbe9d44)]:
  - @fluent-blocks/colors@9.1.0

## 9.1.0-next.3

### Patch Changes

- [#97](https://github.com/OfficeDev/fluent-blocks/pull/97) [`c7d1e68`](https://github.com/OfficeDev/fluent-blocks/commit/c7d1e68f2e0b12a8ad68c7d5a26697c5dbba1e77) Thanks [@thure](https://github.com/thure)! - Update logo.

- Updated dependencies [[`6d8cae3`](https://github.com/OfficeDev/fluent-blocks/commit/6d8cae381bcc38274a39817a3264a1df020f8dea)]:
  - @fluent-blocks/colors@9.1.0-next.1

## 9.1.0-next.2

### Minor Changes

- [#95](https://github.com/OfficeDev/fluent-blocks/pull/95) [`b2690c4`](https://github.com/OfficeDev/fluent-blocks/commit/b2690c44e9bc8306544f759f702c24b92da3235f) Thanks [@thure](https://github.com/thure)! - Adjust card content constituents to handle 280px viewport widths. Add 'flush' variant to Main.

## 9.1.0-next.1

### Minor Changes

- [`1502a39`](https://github.com/OfficeDev/fluent-blocks/commit/1502a39e6e225886b377b381349645e5f7763838) Thanks [@thure](https://github.com/thure)! - Automate prereleases.

## 9.0.0

### Major Changes

- [`7a2eef4`](https://github.com/OfficeDev/fluent-blocks/commit/7a2eef432ed5a088f8f86bfb74303fdc81e287fc) Thanks [@thure](https://github.com/thure)! - Initial release.
