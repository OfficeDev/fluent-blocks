import { MediaProps } from './media-properties'

interface SpinnerProps extends MediaProps {
  loading: {
    variant: 'spinner'
  }
}

// todo: implement progress bar (OfficeDev/fluent-blocks#167)

// interface ProgressBarProps extends MediaProps {
//   loading: {
//     variant: 'progressBar'
//     progress: number
//   }
// }

export type LoadingProps = SpinnerProps /* | ProgressBarProps */
