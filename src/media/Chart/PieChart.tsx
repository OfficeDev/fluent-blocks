import { useEffect, useRef, useMemo, useContext } from 'react'
import Chart from 'chart.js'
import { FluentPatternsContext, useTranslations } from '../../lib'
import {
  tooltipTrigger,
  chartConfig,
  axesConfig,
  setTooltipColorScheme,
  usNumberFormat,
} from './chart-utils'
import { buildPattern, chartBarDataPointPatterns } from './chart-patterns'
import { ChartData } from './chart-types'
import { makeStyles } from '@fluentui/react-components'
import { Legend } from './Legend'

const usePieChartStyles = makeStyles({
  root: {},
  chartContainer: {
    width: '100%',
    aspectRatio: '1',
  },
  legend: {},
})

// eslint-disable-next-line max-lines-per-function
export const PieChart = ({
  title,
  data,
  cutoutPercentage,
}: {
  title: string
  data: ChartData
  cutoutPercentage?: number
}) => {
  if (data && data.datasets && data.datasets[0].data.length > 6) {
    data.datasets[0].data = data.datasets[0].data.slice(0, 6)
    console.warn(
      'Please follow design guidance and apply 6 or fewer data points per chart.'
    )
  }
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const chartRef = useRef<Chart | undefined>()
  const chartId = useMemo(() => Math.random().toString(36).substr(2, 9), [])
  const { themeName, theme } = useContext(FluentPatternsContext)
  const chartDataPointColors = useMemo(
    () => [
      theme.colorBrandBackground2,
      theme.colorBrandForeground2,
      theme.colorBrandBackground,
      theme.colorNeutralStroke1Hover,
      theme.colorNeutralForeground2,
      theme.colorNeutralForeground1,
    ],
    [themeName]
  )
  const translate = useTranslations()

  const pieChartPatterns = Array.from({ length: 6 }, (v, i) =>
    buildPattern({
      ...chartBarDataPointPatterns[i],
      backgroundColor: theme.colorNeutralBackground1,
      patternColor: theme.colorBrandForeground1,
    })
  )

  const pieChartHoverPatterns = Array.from({ length: 6 }, (v, i) =>
    buildPattern({
      ...chartBarDataPointPatterns[i],
      backgroundColor: theme.colorNeutralBackground1,
      patternColor: theme.colorNeutralStroke1Hover,
    })
  )

  const createDataPoints = (): Chart.ChartDataSets[] => {
    let dataPointConfig = {
      label: translate(data.datasets[0].label),
      data: data.datasets[0].data,
      borderWidth: 2,
      borderColor: theme.colorNeutralBackground1,
      hoverBorderColor: theme.colorNeutralBackground1,
      backgroundColor: chartDataPointColors,
      hoverBackgroundColor: chartDataPointColors,
    }
    if (themeName === 'high-contrast') {
      dataPointConfig = {
        ...dataPointConfig,
        borderWidth: 3,
        hoverBorderColor: theme.colorNeutralStroke1Hover,
        borderColor: theme.colorBrandBackground,
        backgroundColor: pieChartPatterns as unknown as string[],
        hoverBackgroundColor: pieChartHoverPatterns as unknown as string[],
      }
    }
    return [dataPointConfig]
  }

  // eslint-disable-next-line max-lines-per-function
  useEffect(() => {
    let selectedIndex = -1
    const selectedDataSet = 0

    if (!canvasRef.current) {
      return
    }
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) {
      return
    }
    const config: any = chartConfig({ type: 'pie' })
    config.options.hover.mode = 'point'

    config.options.layout.padding.top = 32
    config.options.layout.padding.left = -16
    config.options.layout.padding.right = 32
    config.options.layout.padding.bottom = 32

    config.options.scales.xAxes[0].ticks.display = false
    config.options.scales.xAxes[0].gridLines.display = false

    config.options.scales.yAxes[0].ticks.display = false
    config.options.scales.yAxes[0].gridLines.display = false

    if (cutoutPercentage) {
      config.options.cutoutPercentage = cutoutPercentage
    }
    // Pie chart custom settings
    config.options.tooltips.callbacks.label = (tooltipItem: any, data: any) =>
      translate(data.labels[tooltipItem.index])
    config.options.tooltips.callbacks.labelColor = (tooltipItem: any) => ({
      backgroundColor: chartDataPointColors[tooltipItem.index],
    })

    config.options.tooltips.callbacks.title = (tooltipItems: any) =>
      `${(
        (Number(data.datasets[0].data[tooltipItems[0].index]) /
          (data.datasets[0].data as number[]).reduce((a, b) => a + b)) *
        100
      ).toPrecision(2)}% (${usNumberFormat(
        Number(data.datasets[0].data[tooltipItems[0].index])
      )})`

    chartRef.current = new Chart(ctx, {
      ...(config as any),
      data: {
        labels: Array.isArray(data.labels)
          ? data.labels.map((label) => translate(label))
          : translate(data.labels),
        datasets: [],
      },
    })
    const chart: any = chartRef.current

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
        themeName,
        theme,
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
            dataset.borderColor = theme.colorNeutralStroke1Hover
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
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault()
          selectedIndex = (selectedIndex + 1) % meta().data.length
          break
        case 'ArrowLeft':
        case 'ArrowDown':
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
      if (!chartRef.current) {
        return
      }
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
    if (!chartRef.current) {
      return
    }
    if (!canvasRef.current) {
      return
    }
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) {
      return
    }
    // Apply new colors scheme for data points
    chartRef.current.data.datasets = createDataPoints()
    // Update tooltip colors scheme
    setTooltipColorScheme({
      chart: chartRef.current,
      themeName,
      theme,
      chartDataPointColors,
      patterns: chartBarDataPointPatterns,
      verticalDataAlignment: true,
    })
    // Update axes
    axesConfig({ chart: chartRef.current, ctx, theme })

    chartRef.current.update()
  }, [themeName])

  function onLegendClick(datasetIndex: number) {
    console.log('[on legend click]', datasetIndex)
    if (!chartRef.current) {
      return
    }
    // chartRef.current.data.datasets![0].data![datasetIndex].hidden = !chartRef
    //   .current.data.datasets![0].data![datasetIndex].hidden;
    chartRef.current.update()
  }

  const pieChartStyles = usePieChartStyles()

  return (
    <div className={pieChartStyles.root}>
      <div className={pieChartStyles.chartContainer}>
        <canvas
          id={chartId}
          ref={canvasRef}
          tabIndex={0}
          style={{ userSelect: 'none' }}
          aria-label={title}
        >
          {data.datasets.map((set, setKey) =>
            (set.data as number[]).forEach((item: number, itemKey: number) => (
              // Generated tooltips for screen readers
              <div key={itemKey} id={`${chartId}-tooltip-${setKey}-${itemKey}`}>
                <p>{item}</p>
                <span>
                  {data.labels && Array.isArray(data.labels)
                    ? translate(data.labels[setKey])
                    : translate(data.labels)}
                  : {set.data[itemKey]}
                </span>
              </div>
            ))
          )}
        </canvas>
      </div>
      <Legend
        {...{ data, chartDataPointColors, themeName, theme, onLegendClick }}
        patterns={chartBarDataPointPatterns}
        verticalDataAlignment
      />
    </div>
  )
}
