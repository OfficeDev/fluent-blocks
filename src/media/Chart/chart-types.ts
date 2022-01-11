/**
 * The data to display in this Chart.
 * @public
 */
export interface IChartData {
  /**
   * How the x-axis or pie slices should be labeled on the chart, if relevant. Some chart types will
   * not render this label.
   */
  labels: string[]
  /**
   * The Chart’s data, grouped into sets.
   */
  datasets: IChartDataSet[]
}

/**
 * A vector datum for bubble charts and related types.
 * @public
 */
export interface IBubbleChartData {
  x: number
  y: number
  r: number
}

/**
 * One set of the Chart’s data.
 * @public
 */
export interface IChartDataSet {
  /**
   * The label for this set.
   */
  label: string
  /**
   * The scalar values of the set’s data.
   */
  data: number[] | IBubbleChartData[]
  /**
   * Whether this set should be ignored by the Chart.
   */
  hidden?: boolean
}

export enum EPointStyles {
  Circle = 'circle',
  Rectangle = 'rect',
  Triangle = 'triangle',
  RectangleRotated = 'rectRot',
}

export interface ILineChartPatterns {
  lineBorderDash: number[]
  pointStyle: EPointStyles
}

export enum EShapes {
  Square = 'square',
  DiagonalRightLeft = 'diagonalRightLeft',
  Grid = 'grid',
  Diagonal = 'diagonal',
  VerticalLine = 'verticalLine',
  GridRightLeft = 'gridRightLeft',
}

export interface IDraw {
  shapeType: EShapes
  size: number
}

export type IChartPatterns = (colorScheme: any) => IDraw[]

export interface ILegendItem {
  key: number
  kind: string
  content: JSX.Element
  fitted: string
  onClick: (index: number) => void
}
