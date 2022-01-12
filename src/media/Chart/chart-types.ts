import { z } from 'zod'

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
export type ChartTypes = z.infer<typeof chartTypes>

export const chartDataset = z.object({
  label: z.string(),
  data: z.union([
    z.array(z.number()),
    z.array(z.object({ x: z.number(), y: z.number(), z: z.number() })),
  ]),
  hidden: z.boolean().optional(),
})
export type ChartDataset = z.infer<typeof chartDataset>

export const chartData = z.object({
  labels: z.array(z.string()),
  datasets: z.array(chartDataset),
})
export type ChartData = z.infer<typeof chartData>
