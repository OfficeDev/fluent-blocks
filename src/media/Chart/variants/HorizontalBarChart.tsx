import { Chart } from 'chart.js'
import { useEffect, useRef, useContext } from 'react'
import { ChartData } from '../chart-types'
import {
  tooltipTrigger,
  chartConfig,
  axesConfig,
  setTooltipColorScheme,
  horizontalBarValue,
  usNumberFormat,
  useChartId,
} from '../chart-utils'
import {
  buildPattern,
  chartBarDataPointPatterns,
  useChartColors,
} from '../chart-patterns'
import { FluentPatternsContext, useTranslations } from '../../../lib'
import { Legend } from '../Legend'
import { useChartStyles } from '../chart-styles'

// eslint-disable-next-line max-lines-per-function
export const HorizontalBarChart = ({
  label,
  data,
  stacked,
}: {
  label: string
  data: ChartData
  stacked?: boolean
}) => {
  const { themeName, theme } = useContext(FluentPatternsContext)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const chartRef = useRef<Chart | undefined>()
  const chartId = useChartId()
  const chartDataPointColors = useChartColors({ theme, themeName })
  const translate = useTranslations()

  const createDataPoints = (): Chart.ChartDataSets[] =>
    Array.from(data.datasets, (set, i) => {
      let dataPointConfig = {
        label: translate(set.label),
        data: set.data,
        borderWidth: 0,
        barPercentage: 0.5,
        borderSkipped: false,
        borderColor: theme.colorNeutralBackground1,
        hoverBorderColor: chartDataPointColors[i],
        backgroundColor: chartDataPointColors[i],
        hoverBorderWidth: 0,
        hoverBackgroundColor: chartDataPointColors[i],
        pointBorderColor: theme.colorNeutralBackground1,
        pointBackgroundColor: theme.colorNeutralForeground2,
        pointHoverBackgroundColor: theme.colorNeutralForeground2,
        pointHoverBorderColor: chartDataPointColors[i],
        pointHoverBorderWidth: 0,
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        pointBorderWidth: 0,
        pointRadius: 0,
        pointHoverRadius: 0,
      }
      if (themeName === 'high-contrast') {
        const bgPattern = buildPattern({
          ...chartBarDataPointPatterns[i],
          backgroundColor: theme.colorNeutralBackground1,
          patternColor: theme.colorBrandBackground,
        })
        const bgHoverPattern = buildPattern({
          ...chartBarDataPointPatterns[i],
          backgroundColor: theme.colorNeutralBackground1,
          patternColor: theme.colorNeutralStroke1Hover,
        })
        dataPointConfig = {
          ...dataPointConfig,
          borderWidth: 1,
          hoverBorderColor: theme.colorNeutralStroke1Hover,
          hoverBorderWidth: 3,
          pointBorderColor: theme.colorNeutralStroke1,
          pointHoverBorderColor: theme.colorNeutralStroke1Hover,
          pointHoverRadius: 0,
          borderColor: theme.colorBrandBackground,
          backgroundColor: bgPattern as unknown as string,
          hoverBackgroundColor: bgHoverPattern as unknown as string,
        }
      }
      return dataPointConfig as any
    })

  // eslint-disable-next-line max-lines-per-function
  useEffect(() => {
    let selectedIndex = -1
    const selectedDataSet = 0

    if (!canvasRef.current) {return}
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) {return}
    const config: any = chartConfig({ type: 'horizontalBar' })
    config.options.layout.padding.top = -6
    config.options.layout.padding.left = -32

    config.options.hover.mode = 'index'

    config.options.scales.xAxes[0].ticks.display = false
    config.options.scales.xAxes[0].gridLines.display = false

    config.options.scales.yAxes[0].ticks.callback = (v: string) => v
    config.options.scales.yAxes[0].ticks.mirror = true
    config.options.scales.yAxes[0].ticks.padding = 0
    config.options.scales.yAxes[0].gridLines.display = false

    config.options.tooltips.position = 'nearest'

    if (stacked) {
      config.options.hover.mode = 'point'

      config.options.scales.yAxes[0].stacked = true
      config.options.scales.xAxes[0].stacked = true
      config.options.tooltips.mode = 'nearest'
      config.options.tooltips.axis = 'y'
      config.options.tooltips.callbacks.title = (tooltipItems: any) => {
        let total = 0
        data.datasets.map((dataset) => {
          const value = dataset.data[tooltipItems[0].index]
          if (typeof value === 'number') {
            return (total += value)
          }
        })
        return `${((tooltipItems[0].xLabel / total) * 100).toPrecision(
          2
        )}% (${usNumberFormat(tooltipItems[0].xLabel)})`
      }
    }

    chartRef.current = new Chart(ctx, {
      ...(config as any),
      data: {
        labels: Array.isArray(data.labels)
          ? data.labels.map((label) => translate(label))
          : translate(data.labels),
        datasets: [],
      },
      plugins: [
        {
          afterDatasetsDraw: ({ ctx, tooltip, chart }: any) => {
            horizontalBarValue({
              chart,
              ctx,
              stacked,
            })
          },
        },
      ],
    })

    const chart: any = chartRef.current

    chart.config.options.scales.yAxes[0].ticks.labelOffset =
      chart.chartArea.bottom / data.datasets[0].data.length / 2 - 2
    /**
     * Keyboard manipulations
     */
    function meta() {
      return chart.getDatasetMeta(selectedDataSet)
    }

    function removeFocusStyleOnClick() {
      // Remove focus state style if selected by mouse
      if (canvasRef.current) {
        canvasRef.current.style.boxShadow = 'none'
      }
    }

    function removeDataPointsHoverStates() {
      if (selectedIndex > -1) {
        meta().controller.removeHoverStyle(
          meta().data[selectedIndex],
          0,
          selectedIndex
        )
      }
    }

    function hoverDataPoint(pointID: number) {
      meta().controller.setHoverStyle(
        meta().data[pointID],
        selectedDataSet,
        pointID
      )
    }

    function showFocusedDataPoint() {
      hoverDataPoint(selectedIndex)
      tooltipTrigger({
        chart: chartRef.current as any,
        data,
        set: selectedDataSet,
        index: selectedIndex,
        theme,
        themeName,
      })
      document
        .getElementById(
          `${chartId}-tooltip-${selectedDataSet}-${selectedIndex}`
        )
        ?.focus()
    }

    function resetChartStates() {
      removeDataPointsHoverStates()
      const activeElements = chart.tooltip._active
      const requestedElem =
        chart.getDatasetMeta(selectedDataSet).data[selectedIndex]
      activeElements.find((v: any, i: number) => {
        if (requestedElem._index === v._index) {
          activeElements.splice(i, 1)
          return true
        }
      })

      for (let i = 0; i < activeElements.length; i++) {
        if (requestedElem._index === activeElements[i]._index) {
          activeElements.splice(i, 1)
          break
        }
      }
      if (themeName === 'high-contrast') {
        ;(chartRef.current as any).data.datasets.map(
          (dataset: any, i: number) => {
            dataset.borderColor = theme.colorNeutralStroke1
            dataset.borderWidth = 2
            dataset.backgroundColor = buildPattern({
              ...chartBarDataPointPatterns[i],
              backgroundColor: theme.colorNeutralBackground1,
              patternColor: theme.colorBrandBackground,
            })
          }
        )
        chart.update()
      }
      chart.tooltip._active = activeElements
      chart.tooltip.update(true)
      chart.draw()
    }

    function changeFocus(e: KeyboardEvent) {
      removeDataPointsHoverStates()
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          selectedIndex = (selectedIndex + 1) % meta().data.length
          break
        case 'ArrowUp':
          e.preventDefault()
          selectedIndex = (selectedIndex || meta().data.length) - 1
          break
      }

      showFocusedDataPoint()
    }

    canvasRef.current.addEventListener('click', removeFocusStyleOnClick)
    canvasRef.current.addEventListener('keydown', changeFocus)
    canvasRef.current.addEventListener('focusout', resetChartStates)
    return () => {
      if (!chartRef.current) {return}
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('click', removeFocusStyleOnClick)
        canvasRef.current.removeEventListener('keydown', changeFocus)
        canvasRef.current.removeEventListener('focusout', resetChartStates)
      }
      chartRef.current.destroy()
    }
  }, [])

  /**
   * Theme updates
   */
  useEffect(() => {
    if (!chartRef.current) {return}
    if (!canvasRef.current) {return}
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) {return}
    // Apply new colors scheme for data points
    chartRef.current.data.datasets = createDataPoints()
    // Update tooltip colors scheme
    setTooltipColorScheme({
      chart: chartRef.current,
      theme,
      themeName,
      chartDataPointColors,
      patterns: chartBarDataPointPatterns,
    })
    // Update axeses
    axesConfig({ chart: chartRef.current, ctx, theme })
    chartRef.current.options.defaultColor = theme.colorNeutralForeground1
    chartRef.current.update()
  }, [theme])

  function onLegendClick(datasetIndex: number) {
    if (!chartRef.current) {return}
    chartRef.current.data.datasets![datasetIndex].hidden =
      !chartRef.current.data.datasets![datasetIndex].hidden
    chartRef.current.update()
  }

  const chartStyles = useChartStyles()

  return (
    <div>
      <div className={chartStyles.landscapeChartContainer}>
        <canvas
          id={chartId}
          ref={canvasRef}
          tabIndex={0}
          style={{
            userSelect: 'none',
          }}
          aria-label={label}
        >
          {data.datasets.map((set, setKey) =>
            (set.data as number[]).forEach((item: number, itemKey: number) => (
              // Generated tooltips for screen readers
              <div key={itemKey} id={`${chartId}-tooltip-${setKey}-${itemKey}`}>
                <p>{item}</p>
                <span>
                  {translate(set.label)}: {set.data[itemKey]}
                </span>
              </div>
            ))
          )}
        </canvas>
      </div>
      <Legend
        {...{ data, chartDataPointColors, themeName, theme, onLegendClick }}
        patterns={chartBarDataPointPatterns}
      />
    </div>
  )
}
