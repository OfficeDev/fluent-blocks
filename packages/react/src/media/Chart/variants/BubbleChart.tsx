import { Chart } from 'chart.js'
import { memo, useCallback, useContext, useEffect, useRef } from 'react'

import { FluentBlocksContext, useTranslations } from '../../../lib'
import { Legend } from '../Legend'
import {
  buildPattern,
  chartBubbleDataPointPatterns,
  useChartColors,
} from '../chart-patterns'
import { useChartStyles } from '../chart-styles'
import { BubbleChartDatum, ChartData } from '../chart-types'
import {
  axesConfig,
  chartConfig,
  setTooltipColorScheme,
  tooltipTrigger,
  useChartId,
} from '../chart-utils'

/**
 * @internal
 */
export const BubbleChart = memo(
  // eslint-disable-next-line max-lines-per-function
  function UnmemoizedBubbleChart({
    label,
    data,
  }: {
    label: string
    data: ChartData
  }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const chartRef = useRef<Chart | undefined>()
    const chartId = useChartId()
    const { themeName, theme } = useContext(FluentBlocksContext)

    const chartDataPointColors = useChartColors({ theme, themeName })
    const translate = useTranslations()

    // Sort for kayboard access
    data.datasets.map((dataset) => {
      dataset.data.sort((a: any, b: any) => a.x - b.x)
    })

    const createDataPoints = useCallback(
      (): Chart.ChartDataSets[] =>
        Array.from(data.datasets, (set, i) => {
          let dataPointConfig = {
            label: translate(set.label),
            data: set.data,
            borderWidth: 0,
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
          if (themeName === 'highContrast') {
            const backgroundPattern = buildPattern({
              ...chartBubbleDataPointPatterns[i],
              backgroundColor: theme.colorNeutralBackground1,
              patternColor: theme.colorBrandBackground,
            })
            const backgroundPatternHover = buildPattern({
              ...chartBubbleDataPointPatterns[i],
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
              backgroundColor: backgroundPattern as unknown as string,
              hoverBackgroundColor: backgroundPatternHover as unknown as string,
            }
          }
          return dataPointConfig as any
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
      const config: any = chartConfig({ type: 'bubble' })
      config.options.hover.mode = 'nearest'

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
        if (themeName === 'highContrast') {
          ;(chartRef.current as any).data.datasets.map(
            (dataset: any, i: number) => {
              dataset.borderColor = theme.colorNeutralStroke1
              dataset.borderWidth = 2
              dataset.backgroundColor = buildPattern({
                ...chartBubbleDataPointPatterns[i],
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
          case 'ArrowDown':
            e.preventDefault()
            if (data.datasets.length > 1) {
              // Get all values for the current data point
              const values = data.datasets.map(
                (dataset) => dataset.data[selectedIndex]
              )
              // Sort an array to define next available number
              const sorted = (
                [...Array.from(new Set(values))] as BubbleChartDatum[]
              ).sort((a: BubbleChartDatum, b: BubbleChartDatum) => a.y - b.y)
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
      chartRef.current.data.datasets = createDataPoints()
      // Update tooltip colors scheme
      setTooltipColorScheme({
        chart: chartRef.current,
        themeName,
        theme,
        chartDataPointColors,
        patterns: chartBubbleDataPointPatterns,
      })
      // Update axeses
      axesConfig({ chart: chartRef.current, ctx, theme })

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
            style={{ userSelect: 'none' }}
            tabIndex={0}
            aria-label={label}
          >
            {data.datasets.map((set, setKey) =>
              (set.data as BubbleChartDatum[]).map(
                (item: BubbleChartDatum, itemKey: number) => (
                  // Generated tooltips for screen readers
                  <div
                    key={itemKey}
                    id={`${chartId}-tooltip-${setKey}-${itemKey}`}
                  >
                    <p>{item.x}</p>
                    <span>
                      {translate(set.label)}:{' '}
                      {(set.data as BubbleChartDatum[])[itemKey].y}
                    </span>
                  </div>
                )
              )
            )}
          </canvas>
        </div>
        <Legend
          {...{ data, chartDataPointColors, themeName, theme, onLegendClick }}
          patterns={chartBubbleDataPointPatterns}
        />
      </div>
    )
  }
)
