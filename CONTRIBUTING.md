# Contributing to Fluent Kit

When implementing a new pattern, be sure to:

1. Create/update all relevant schemas/TS interfaces/(whatever other payload validation method we choose).
2. Create/update all relevant component stories
   - Controls
   - Docs
      - What is this component for?
      - Links to design specs
3. Create/update any relevant accessibility tests:
   - Elements receive focus as expected
   - Announcements are made in screen readers as needed
   - Space/Enter/Arrow keys have the intended effect
4. Component implementation
   - Use [CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) (instead of left/rigt), e.g. `marginInlineStart`.
   - Use theme color aliases instead of CSS color literals.
   - If a part of the component should have an escape hatch, use the correct type for its props (TBD, proposed: `unadvisedlyOverrideSlotContent`).
