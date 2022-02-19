# Charts

The charting components in this library are ported from `@fluent-ui/react-teams`
and depend on ChartJS v2.9.4 which is augmented for each type of chart to
conform to Fluent designs including the high contrast theme and access for
keyboards and screen readers.

Since even ChartJS’s API is serializeable (except callbacks), there is no
meaningful JSX syntax variant (at least that I could imagine) for charts.

ChartJS’s v3 has come a long way since these components were first coded, so an
upgrade to v3 should be considered and is tracked as [#35](https://github.com/OfficeDev/fluent-react-patterns/issues/35).
