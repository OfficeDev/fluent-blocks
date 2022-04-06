import { shorthands as FUIShorthands } from '@fluentui/react-components'
import * as CSS from 'csstype'

// The functions defined here are designed to be overwritten when shorthand
// functions by the same name become available in Griffel.

const sxExtensions = {
  transition: (
    property: CSS.TransitionPropertyProperty,
    duration: CSS.GlobalsString,
    timingFunction: CSS.TransitionTimingFunctionProperty
  ) => ({
    transitionProperty: property,
    transitionDuration: duration,
    transitionTimingFunction: timingFunction,
  }),
  flex: (
    grow: CSS.GlobalsNumber,
    shrink: CSS.GlobalsNumber,
    basis: CSS.FlexBasisProperty<string>
  ) => ({
    flexGrow: grow,
    flexShrink: shrink,
    flexBasis: basis,
  }),
  flexFlow: (
    direction: CSS.FlexDirectionProperty,
    wrap: CSS.FlexWrapProperty
  ) => ({
    flexDirection: direction,
    flexWrap: wrap,
  }),
  textDecoration: (
    line: CSS.TextDecorationLineProperty,
    color?: CSS.TextDecorationColorProperty,
    style?: CSS.TextDecorationStyleProperty,
    thickness?: CSS.TextDecorationThicknessProperty<never>
  ) => ({
    textDecorationLine: line,
    ...(color && { textDecorationColor: color }),
    ...(style && { textDecorationStyle: style }),
    ...(thickness && { textDecorationThickness: thickness }),
  }),
}

export const sx: typeof sxExtensions & typeof FUIShorthands = {
  ...sxExtensions,
  ...FUIShorthands,
}
