import { Chart } from 'chart.js'
import { memo, useCallback, useContext, useEffect, useRef } from 'react'

import { FluentBlocksContext, useTranslations } from '../../../lib'
import { Legend } from '../Legend'
import { lineChartPatterns, useChartColors } from '../chart-patterns'
import { useChartStyles } from '../chart-styles'
import { ChartData } from '../chart-types'
import {
  axesConfig,
  chartConfig,
  hexToRgb,
  setTooltipColorScheme,
  tooltipAxisYLine,
  tooltipTrigger,
  useChartId,
} from '../chart-utils'

/**
 * @internal
 */
export const LineChart = memo(
  // eslint-disable-next-line max-lines-per-function
  function UnmemoizedLineChart({
    label,
    data,
    gradients,
  }: {
    label: string
    data: ChartData
    gradients?: boolean
  }) {
    const { themeName, theme } = useContext(FluentBlocksContext)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const chartRef = useRef<Chart | undefined>()
    const chartId = useChartId()
    const chartDataPointColors = useChartColors({ theme, themeName })
    const translate = useTranslations()

    const createDataPoints = useCallback(
      (): Chart.ChartDataSets[] =>
        Array.from(data.datasets, (set, i) => {
          let dataPointConfig = {
            label: translate(set.label),
            data: set.data,
            borderColor: chartDataPointColors[i],
            hoverBorderColor: chartDataPointColors[i],
            hoverBorderWidth: 2,
            backgroundColor: 'transparent',
            hoverBackgroundColor: 'transparent',
            borderWidth: 2,
            pointBorderColor: chartDataPointColors[i],
            pointBackgroundColor: chartDataPointColors[i],
            pointHoverBackgroundColor: chartDataPointColors[i],
            pointHoverBorderColor: chartDataPointColors[i],
            pointHoverBorderWidth: 0,
            borderCapStyle: 'round',
            borderJoinStyle: 'round',
            pointBorderWidth: 0,
            pointRadius: 2,
            pointHoverRadius: 2,
            pointStyle: 'circle',
            borderDash: [],
          }
          if (themeName === 'highContrast') {
            dataPointConfig = {
              ...dataPointConfig,
              borderColor: theme.colorBrandBackground,
              hoverBorderColor: theme.colorNeutralStroke1Hover,
              pointBorderColor: theme.colorBrandBackground,
              pointBackgroundColor: theme.colorBrandBackground,
              pointHoverBackgroundColor: theme.colorBrandBackground,
              pointHoverBorderColor: theme.colorBrandBackground,
              hoverBorderWidth: 4,
              pointRadius: 4,
              pointHoverRadius: 4,
              pointStyle: lineChartPatterns[i].pointStyle,
              borderDash: lineChartPatterns[i].lineBorderDash,
            } as any
          }
          return dataPointConfig as Chart.ChartDataSets
        }),
      [chartDataPointColors, data.datasets, theme, themeName, translate]
    )

    const createAreaChartDataPoints = useCallback(
      (ctx: CanvasRenderingContext2D): Chart.ChartDataSets[] =>
        Array.from(data.datasets, (set, i) => {
          const gradientStroke = ctx.createLinearGradient(
            0,
            0,
            0,
            ctx.canvas.clientHeight * 0.8
          )
          const hoverGradientStroke = ctx.createLinearGradient(
            0,
            0,
            0,
            ctx.canvas.clientHeight * 0.8
          )
          if (themeName === 'highContrast') {
            const colorRGB = hexToRgb(theme.colorBrandBackground)
            const hoverColorRGB = hexToRgb(theme.colorNeutralStroke1Hover)
            gradientStroke.addColorStop(0, `rgba(${colorRGB}, .2)`)
            gradientStroke.addColorStop(1, `rgba(${colorRGB}, .0)`)
            hoverGradientStroke.addColorStop(0, `rgba(${hoverColorRGB}, .4)`)
            hoverGradientStroke.addColorStop(1, `rgba(${hoverColorRGB}, .0)`)
          } else {
            const colorRGB = hexToRgb(chartDataPointColors[i])
            gradientStroke.addColorStop(0, `rgba(${colorRGB}, .4)`)
            gradientStroke.addColorStop(1, `rgba(${colorRGB}, .0)`)
            hoverGradientStroke.addColorStop(0, `rgba(${colorRGB}, .6)`)
            hoverGradientStroke.addColorStop(1, `rgba(${colorRGB}, .0)`)
          }

          let dataPointConfig = {
            label: translate(set.label),
            data: set.data,
            borderColor: chartDataPointColors[i],
            hoverBorderColor: chartDataPointColors[i],
            hoverBorderWidth: 2,
            backgroundColor: gradientStroke as any,
            hoverBackgroundColor: hoverGradientStroke as any,
            borderWidth: 2,
            pointBorderColor: chartDataPointColors[i],
            pointBackgroundColor: chartDataPointColors[i],
            pointHoverBackgroundColor: chartDataPointColors[i],
            pointHoverBorderColor: chartDataPointColors[i],
            pointHoverBorderWidth: 0,
            borderCapStyle: 'round',
            borderJoinStyle: 'round',
            pointBorderWidth: 0,
            pointRadius: 2,
            pointHoverRadius: 2,
            pointStyle: 'circle',
            borderDash: [],
          }
          if (themeName === 'highContrast') {
            dataPointConfig = {
              ...dataPointConfig,
              borderColor: theme.colorBrandBackground,
              hoverBorderColor: theme.colorNeutralStroke1Hover,
              pointBorderColor: theme.colorBrandBackground,
              pointBackgroundColor: theme.colorBrandBackground,
              pointHoverBackgroundColor: theme.colorBrandBackground,
              pointHoverBorderColor: theme.colorBrandBackground,
              hoverBorderWidth: 4,
              pointRadius: 4,
              pointHoverRadius: 4,
              pointStyle: lineChartPatterns[i].pointStyle,
              borderDash: lineChartPatterns[i].lineBorderDash,
            } as any
          }
          return dataPointConfig as Chart.ChartDataSets
        }),
      [chartDataPointColors, data.datasets, theme, themeName, translate]
    )

    // eslint-disable-next-line max-lines-per-function
    useEffect(() => {
      let selectedIndex = -1
      let selectedDataSet = 0

      if (!canvasRef.current) {
        return
      }
      const ctx = canvasRef.current.getContext('2d')
      if (!ctx) {
        return
      }
      chartRef.current = new Chart(ctx, {
        ...(chartConfig({ type: 'line' }) as any),
        data: {
          labels: Array.isArray(data.labels)
            ? data.labels.map((label) => translate(label))
            : translate(data.labels),
          datasets: [],
        },
        plugins: [
          {
            afterDatasetsDraw: ({ ctx, tooltip, chart }: any) => {
              tooltipAxisYLine({
                chart,
                ctx,
                tooltip,
              })
            },
          },
        ],
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
        if (themeName === 'highContrast') {
          chart.data.datasets.map((dataset: any) => {
            dataset.borderColor = theme.colorNeutralStroke1
            dataset.borderWidth = 2
          })
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
            e.preventDefault()
            selectedIndex = (selectedIndex + 1) % meta().data.length
            break
          case 'ArrowLeft':
            e.preventDefault()
            selectedIndex = (selectedIndex || meta().data.length) - 1
            break
          case 'ArrowUp':
          case 'ArrowDown':
            e.preventDefault()
            if (data.datasets.length > 1) {
              // Get all values for the current data point
              const values = data.datasets.map(
                (dataset) => dataset.data[selectedIndex]
              )
              // Sort an array to define next available number
              const sorted = [...Array.from(new Set(values))].sort(
                (a, b) => Number(a) - Number(b)
              )
              const nextValue =
                sorted[
                  sorted.findIndex((v) => v === values[selectedDataSet]) +
                    (e.key === 'ArrowUp' ? 1 : -1)
                ]

              // Find dataset ID by the next higher number after current
              let nextDataSet = values.findIndex((v) => v === nextValue)

              // If there is no next number that could selected, get number from oposite side
              if (nextDataSet < 0) {
                nextDataSet = values.findIndex(
                  (v) =>
                    v ===
                    sorted[e.key === 'ArrowUp' ? 0 : data.datasets.length - 1]
                )
              }
              selectedDataSet = nextDataSet
              selectedIndex = selectedIndex % meta().data.length
            }
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
          canvasRef.current.removeEventListener(
            'click',
            removeFocusStyleOnClick
          )
          canvasRef.current.removeEventListener('keydown', changeFocus)
          // eslint-disable-next-line react-hooks/exhaustive-deps
          canvasRef.current.removeEventListener('focusout', resetChartStates)
        }
        chartRef.current.destroy()
      }
    }, [chartId, data, theme, themeName, translate])

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
      chartRef.current.data.datasets = gradients
        ? createAreaChartDataPoints(ctx)
        : createDataPoints()
      // Update tooltip colors scheme
      setTooltipColorScheme({
        chart: chartRef.current,
        theme,
        themeName,
        chartDataPointColors,
      })
      // Update axeses
      axesConfig({ chart: chartRef.current, ctx, theme })
      // Show style changes
      chartRef.current.update()
    }, [
      chartDataPointColors,
      createAreaChartDataPoints,
      createDataPoints,
      gradients,
      theme,
      themeName,
    ])

    function onLegendClick(datasetIndex: number) {
      if (!chartRef.current) {
        return
      }
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
              (set.data as number[]).map((item: number, itemKey: number) => (
                // Generated tooltips for screen readers
                <div
                  key={itemKey}
                  id={`${chartId}-tooltip-${setKey}-${itemKey}`}
                >
                  <p>{item}</p>
                  <span>{`${translate(set.label)}: ${set.data[itemKey]}`}</span>
                </div>
              ))
            )}
          </canvas>
        </div>
        <Legend
          {...{ data, chartDataPointColors, themeName, theme, onLegendClick }}
        />
      </div>
    )
  }
)
