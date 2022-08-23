import { Chart } from 'chart.js'
import { memo, useCallback, useContext, useEffect, useRef } from 'react'

import { FluentBlocksContext, useTranslations } from '../../../lib'
import { Legend } from '../Legend'
import {
  buildPattern,
  chartLineStackedDataPointPatterns,
  lineChartPatterns,
  useChartColors,
} from '../chart-patterns'
import { useChartStyles } from '../chart-styles'
import { ChartData } from '../chart-types'
import {
  axesConfig,
  chartConfig,
  setTooltipColorScheme,
  tooltipAxisYLine,
  tooltipTrigger,
  usNumberFormat,
  useChartId,
} from '../chart-utils'

/**
 * @internal
 */
export const StackedLineChart = memo(
  // eslint-disable-next-line max-lines-per-function
  function UnmemoizedStackedLineChart({
    label,
    data,
  }: {
    label: string
    data: ChartData
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
            borderWidth: 1,
            borderColor: theme.colorNeutralBackground1,
            hoverBorderColor: chartDataPointColors[i],
            backgroundColor: chartDataPointColors[i],
            hoverBorderWidth: 2,
            hoverBackgroundColor: chartDataPointColors[i],
            pointBorderColor: theme.colorNeutralBackground1,
            pointBackgroundColor: theme.colorNeutralForeground2,
            pointHoverBackgroundColor: theme.colorNeutralForeground2,
            pointHoverBorderColor: chartDataPointColors[i],
            pointHoverBorderWidth: 2,
            borderCapStyle: 'round',
            borderJoinStyle: 'round',
            pointBorderWidth: 0,
            pointRadius: 0,
            pointHoverRadius: 3,
            pointStyle: 'circle',
            borderDash: [],
          }
          if (themeName === 'highContrast') {
            const bgPattern = buildPattern({
              ...chartLineStackedDataPointPatterns[i],
              backgroundColor: theme.colorNeutralBackground1,
              patternColor: theme.colorBrandBackground,
            })
            const bgPatternHover = buildPattern({
              ...chartLineStackedDataPointPatterns[i],
              backgroundColor: theme.colorNeutralBackground1,
              patternColor: theme.colorNeutralStroke1Hover,
            })
            dataPointConfig = {
              ...dataPointConfig,
              borderWidth: 3,
              hoverBorderColor: theme.colorNeutralStroke1Hover,
              hoverBorderWidth: 4,
              pointBorderColor: theme.colorNeutralStroke1,
              pointHoverBorderColor: theme.colorNeutralStroke1Hover,
              pointHoverRadius: 5,
              pointStyle: lineChartPatterns[i].pointStyle,
              borderColor: theme.colorBrandBackground,
              backgroundColor: bgPattern as unknown as string,
              hoverBackgroundColor: bgPatternHover as unknown as string,
            }
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
      const config: any = chartConfig({ type: 'line' })

      // Stacked chart custom settings
      config.options.tooltips.callbacks.title = (tooltipItems: any) => {
        let total = 0
        data.datasets.map((dataset) => {
          const value = dataset.data[tooltipItems[0].index]
          if (typeof value === 'number') {
            return (total += value)
          }
        })
        return `${((tooltipItems[0].yLabel / total) * 100).toPrecision(
          2
        )}% (${usNumberFormat(tooltipItems[0].yLabel)})`
      }
      config.options.scales.yAxes[0].stacked = true

      chartRef.current = new Chart(ctx, {
        ...config,
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
          ;(chartRef.current as any).data.datasets.map(
            (dataset: any, i: number) => {
              dataset.borderColor = theme.colorNeutralStroke1
              dataset.borderWidth = 2
              dataset.backgroundColor = buildPattern({
                ...chartLineStackedDataPointPatterns[i],
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
            e.preventDefault()
            selectedIndex = (selectedIndex + 1) % meta().data.length
            break
          case 'ArrowLeft':
            e.preventDefault()
            selectedIndex = (selectedIndex || meta().data.length) - 1
            break
          case 'ArrowUp':
            e.preventDefault()
            if (data.datasets.length > 1) {
              selectedDataSet += 1
              if (selectedDataSet === data.datasets.length) {
                selectedDataSet = 0
              }
            }
            break
          case 'ArrowDown':
            e.preventDefault()
            if (data.datasets.length > 1) {
              selectedDataSet -= 1
              if (selectedDataSet < 0) {
                selectedDataSet = data.datasets.length - 1
              }
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
      chartRef.current.data.datasets = createDataPoints()
      // Update tooltip colors scheme
      setTooltipColorScheme({
        chart: chartRef.current,
        theme,
        themeName,
        chartDataPointColors,
        patterns: chartLineStackedDataPointPatterns,
      })
      // Update axeses
      axesConfig({ chart: chartRef.current, ctx, theme })
      // Show style changes
      chartRef.current.update()
    }, [chartDataPointColors, createDataPoints, theme, themeName])

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
          patterns={chartLineStackedDataPointPatterns}
        />
      </div>
    )
  }
)
