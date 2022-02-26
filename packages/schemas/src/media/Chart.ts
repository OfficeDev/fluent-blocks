import { z } from 'zod'
import { mediaProps } from './media-properties'

export const chartTypes = z.union([
  z.literal('line'),
  z.literal('line-stacked'),
  z.literal('line-area'),
  z.literal('bar'),
  z.literal('bar-stacked'),
  z.literal('bar-horizontal'),
  z.literal('bar-horizontal-stacked'),
  z.literal('pie'),
  z.literal('doughnut'),
  z.literal('bubble'),
])

export const bubbleChartDatum = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
})

export const chartDataset = z.object({
  label: z.string(),
  data: z.union([z.array(z.number()), z.array(bubbleChartDatum)]),
  hidden: z.boolean().optional(),
})

export const chartData = z.object({
  labels: z.array(z.string()),
  datasets: z.array(chartDataset),
})

export const chartProps = mediaProps.merge(
  z.object({
    chart: z.object({
      type: chartTypes,
      data: chartData,
    }),
  })
)
