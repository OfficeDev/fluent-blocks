import { z } from 'zod'
import {
  bubbleChartDatum,
  chartDataset,
  chartData,
} from '@fluentui/blocks-schemas'

export type BubbleChartDatum = z.infer<typeof bubbleChartDatum>

export type ChartDataset = z.infer<typeof chartDataset>

export type ChartData = z.infer<typeof chartData>
