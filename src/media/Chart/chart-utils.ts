import Chart from 'chart.js'
import { Theme } from '../../lib'
import { Theme as ColorScheme } from '@fluentui/react-components'
import { IChartData, IChartDataSet, IChartPatterns, IDraw } from './chart-types'
import { buildPattern } from './chart-patterns'
import { ChartData, ChartDataset } from './Chart'

export const random = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min) + min)

// TODO: Localization
const suffixes = ['K', 'M', 'G', 'T', 'P', 'E']

export const chartAxisCallback = (value: number | string): string => {
  if (typeof value === 'number') {
    if (value < 1000) {
      return String(value)
    }
    const exp = Math.floor(Math.log(Number(value)) / Math.log(1000))
    value = `${Number(value) / Math.pow(1000, exp)}${suffixes[exp - 1]}`
    // There is no support for label aligment in Chart.js,
    // to be able align axis labels by left (right is by default)
    // add an additional spaces depends on label length
    switch (value.length) {
      case 2:
        return `${value  }  `
      case 1:
        return `${value  }   `
      case 3:
      default:
        return value
    }
  } else {
    return value
  }
}

export const hexToRgb = (hex: string) => {
  if (hex.length < 6) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
  }
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : null
}

export const usNumberFormat = (value: number | string): string =>
  String(value)
    .split('')
    .reverse()
    .join('')
    .replace(/(\d{3})/g, '$1,')
    .replace(/\,$/, '')
    .split('')
    .reverse()
    .join('')

export function tooltipTrigger({
  chart,
  data,
  set,
  index,
  theme,
  colorScheme,
  mergeDuplicates,
  patterns,
}: {
  chart: any
  data: ChartData
  set: number
  index: number
  theme: Theme
  colorScheme: ColorScheme
  mergeDuplicates?: boolean
  patterns?: (colorSheme: any) => IDraw[]
}) {
  if (mergeDuplicates) {
    const duplicates: number[] = []
    const segments: any[] = []
    // Check for equal data points
    data.datasets.filter((dataset: ChartDataset, i: number) => {
      if (dataset.data[index] === data.datasets[set].data[index]) {
        duplicates.push(i)
      }
      if (theme === 'high-contrast') {
        chart.data.datasets[i].borderColor = colorScheme.colorNeutralStroke1
        chart.data.datasets[i].borderWidth = 2
      }
    })
    duplicates.forEach((segmentId) => {
      segments.push(chart.getDatasetMeta(segmentId).data[index])
      if (theme === 'high-contrast') {
        chart.data.datasets[segmentId].borderColor =
          colorScheme.colorNeutralStroke1Hover
        chart.data.datasets[segmentId].borderWidth = 4
      }
    })
    if (theme === 'high-contrast') {
      chart.update()
    }
    chart.tooltip._active = segments
  } else {
    const segment = chart.getDatasetMeta(set).data[index]
    chart.tooltip._active = [segment]
    if (theme === 'high-contrast' && patterns) {
      chart.data.datasets.map((dataset: any, i: number) => {
        dataset.borderColor = colorScheme.colorNeutralStroke1
        dataset.borderWidth = 2
        dataset.backgroundColor = buildPattern({
          ...patterns(colorScheme)[index],
          backgroundColor: colorScheme.colorNeutralBackground1,
          patternColor: colorScheme.colorBrandBackground,
        })
      })
      chart.data.datasets[set].borderColor =
        colorScheme.colorNeutralStroke1Hover
      chart.data.datasets[set].borderWidth = 4
      chart.data.datasets[set].backgroundColor = chart.data.datasets[
        set
      ].backgroundColor = buildPattern({
        ...patterns(colorScheme)[set],
        backgroundColor: colorScheme.colorNeutralBackground1,
        patternColor: colorScheme.colorNeutralStroke1Hover,
      })
      chart.update()
    }
  }
  chart.tooltip.update()
  chart.draw()
}

export const tooltipAxisYLine = ({ chart, ctx, tooltip }: any) => {
  if (tooltip._active && tooltip._active.length) {
    const activePoint = tooltip._active[0];
      const y = activePoint.tooltipPosition().y;
      const x = activePoint.tooltipPosition().x;
      const y_axis = chart.scales['y-axis-0'];
      const topY = y_axis.top;
      const bottomY = y_axis.bottom

    ctx.save()
    // Line
    ctx.beginPath()
    ctx.moveTo(x, topY)
    ctx.lineTo(x, bottomY)
    ctx.setLineDash([5, 5])
    ctx.lineWidth = 1
    ctx.strokeStyle = chart.options.scales.yAxes[0].gridLines.color
    ctx.stroke()
    // Point
    ctx.beginPath()
    ctx.setLineDash([])
    ctx.arc(x, y, 5, 0, 2 * Math.PI, true)
    ctx.lineWidth = 2
    ctx.fillStyle = 'white'
    ctx.strokeStyle =
      chart.data.datasets[activePoint._datasetIndex].hoverBorderColor
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }
}

export const tooltipAxisXLine = ({ chart, ctx, tooltip }: any) => {
  if (tooltip._active && tooltip._active.length) {
    const activePoint = tooltip._active[0];
      const y = activePoint.tooltipPosition().y;
      const x = activePoint.tooltipPosition().x;
      const x_axis = chart.scales['x-axis-0'];
      const leftX = x_axis.left;
      const rightX = x_axis.right

    ctx.save()
    // Line
    ctx.beginPath()
    ctx.moveTo(leftX - 20, y)
    ctx.lineTo(rightX, y)
    ctx.setLineDash([5, 5])
    ctx.lineWidth = 1
    ctx.strokeStyle = chart.options.scales.yAxes[0].gridLines.color
    ctx.stroke()
    ctx.restore()
  }
}

export const horizontalBarValue = ({ chart, ctx, stacked }: any) => {
  ctx.font = 'bold 11px Segoe UI'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = chart.options.defaultColor
  if (stacked) {
    const meta = chart.controller.getDatasetMeta(chart.data.datasets.length - 1)
    meta.data.forEach((bar: any, index: number) => {
      let data = 0
      chart.data.datasets.map((dataset: IChartDataSet) => {
        const value = dataset.data[index]
        if (typeof value === 'number') {
          return (data += value)
        }
      })
      ctx.fillText(data, bar._model.x + 8, bar._model.y)
    })
  } else {
    chart.data.datasets.forEach((dataset: any, i: number) => {
      const meta = chart.controller.getDatasetMeta(i)
      meta.data.forEach((bar: any, index: number) => {
        const data = dataset.data[index]
        ctx.fillText(data, bar._model.x + 8, bar._model.y)
      })
    })
  }
}

export const chartConfig = ({
  type,
}: {
  type: 'line' | 'bar' | 'horizontalBar' | 'pie' | 'bubble'
}) => ({
  type,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
    },
    layout: {
      padding: {
        left: 0,
        right: 16,
        top: 0,
        bottom: 0,
      },
    },
    scaleLabel: {
      display: false,
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    hover: {
      mode: 'dataset',
      intersect: false,
    },
    tooltips: tooltipConfig(),
    scales: {
      xAxes: [
        {
          ticks: {
            fontSize: 10,
            padding: 0,
            labelOffset: 4,
            maxRotation: 0,
            minRotation: 0,
            callback: chartAxisCallback,
          },
          gridLines: {
            borderDash: [5, 9999],
            zeroLineBorderDash: [5, 9999],
          },
        },
      ],
      yAxes: [
        {
          stacked: false,
          ticks: {
            callback: chartAxisCallback,
            fontSize: 10,
            padding: -16,
            labelOffset: 10,
            maxTicksLimit: 5,
          },
          gridLines: {
            lineWidth: 1,
            drawBorder: false,
            drawTicks: true,
            tickMarkLength: 44,
          },
        },
      ],
    },
  },
})

export const axesConfig = ({
  chart,
  ctx,
  colorScheme,
}: {
  chart: Chart
  ctx: CanvasRenderingContext2D
  colorScheme: ColorScheme
}) => {
  const axesXGridLines = ctx!.createLinearGradient(100, 100, 100, 0)
  axesXGridLines.addColorStop(0.01, colorScheme.colorNeutralStroke1)
  axesXGridLines.addColorStop(0.01, 'transparent')

  chart.options.scales?.xAxes?.forEach((xAxes: any, index: number) => {
    xAxes.ticks.fontColor = colorScheme.colorNeutralForeground2
    if (index < 1) {
      xAxes.gridLines.color = axesXGridLines
      xAxes.gridLines.zeroLineColor = axesXGridLines
    } else {
      xAxes.gridLines.color = 'transparent'
    }
  })
  chart.options.scales?.yAxes?.forEach((yAxes: any, index: number) => {
    yAxes.ticks.fontColor = colorScheme.colorNeutralForeground2
    if (index < 1) {
      yAxes.gridLines.color = colorScheme.colorNeutralStroke1
      yAxes.gridLines.zeroLineColor = colorScheme.colorNeutralStroke1
    } else {
      yAxes.gridLines.color = 'transparent'
    }
  })
}

export const setTooltipColorScheme = ({
  chart,
  theme,
  colorScheme,
  chartDataPointColors,
  patterns,
  verticalDataAlignment,
}: {
  chart: Chart
  theme: Theme
  colorScheme: ColorScheme
  chartDataPointColors: string[]
  patterns?: IChartPatterns
  verticalDataAlignment?: boolean
}) => {
  chart.options.tooltips = {
    ...chart.options.tooltips,
    backgroundColor:
      theme === 'dark'
        ? colorScheme.colorNeutralBackground2
        : colorScheme.colorNeutralBackground1,
    borderColor: colorScheme.colorNeutralStroke1Hover,
    multiKeyBackground: colorScheme.colorNeutralBackground1,
    titleFontColor: colorScheme.colorNeutralForeground3,
    bodyFontColor: colorScheme.colorNeutralForeground3,
    footerFontColor: colorScheme.colorNeutralForeground3,
    borderWidth: theme === 'high-contrast' ? 2 : 0,
    callbacks: {
      ...chart.options.tooltips?.callbacks,
      labelColor:
        patterns && theme === 'high-contrast'
          ? (tooltipItem: any) => ({
              borderColor: 'transparent',
              backgroundColor: buildPattern({
                ...patterns(colorScheme)[
                  verticalDataAlignment
                    ? tooltipItem.index
                    : tooltipItem.datasetIndex
                ],
                backgroundColor: colorScheme.colorNeutralBackground1,
                patternColor: colorScheme.colorNeutralStroke1Hover,
              }) as any,
            })
          : (tooltipItem: any) => ({
              borderColor: 'transparent',
              backgroundColor:
                chartDataPointColors[
                  verticalDataAlignment
                    ? tooltipItem.index
                    : tooltipItem.datasetIndex
                ],
            }),
    },
  }
  if (theme === 'high-contrast') {
    ;(chart as any).options.scales.yAxes[0].gridLines.lineWidth = 0.25
  } else {
    ;(chart as any).options.scales.yAxes[0].gridLines.lineWidth = 1
  }
}

export const tooltipConfig = () => ({
  yPadding: 12,
  xPadding: 20,
  caretPadding: 10,
  // Tooltip Title
  titleFontStyle: '200',
  titleFontSize: 20,
  // Tooltip Body
  bodySpacing: 4,
  bodyFontSize: 11.5,
  bodyFontStyle: '400',
  // Tooltip Footer
  footerFontStyle: '300',
  footerFontSize: 10,

  callbacks: {
    title: (tooltipItems: any) => {
      const value = tooltipItems[0].yLabel
      return typeof value === 'number' && value > 999
        ? usNumberFormat(value)
        : value
    },
    label: (tooltipItem: any, data: any) =>
      data.datasets[tooltipItem.datasetIndex].label,
    footer: (tooltipItems: any) => {
      const value = tooltipItems[0].xLabel
      return typeof value === 'number' && value > 999
        ? usNumberFormat(value)
        : value
    },
  },
})
