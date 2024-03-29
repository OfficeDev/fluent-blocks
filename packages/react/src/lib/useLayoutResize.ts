import debounce from 'lodash/debounce'
import { RefObject, useCallback, useEffect } from 'react'

import useResizeObserver from '@react-hook/resize-observer'

export function useLayoutResize<T extends HTMLElement>(
  ref: RefObject<T>,
  onResizeCompute: () => void,
  onResizeStart?: () => void
): void {
  useEffect(() => {
    if (ref.current) {
      onResizeCompute()
    }
  }, [onResizeCompute, ref])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnResizeCompute = useCallback(
    debounce(
      () => {
        if (ref.current) {
          onResizeCompute()
        }
      },
      100,
      { leading: false, trailing: true }
    ),
    [onResizeCompute]
  )

  const onResize = useCallback(() => {
    if (onResizeStart) {
      onResizeStart()
    }
    debouncedOnResizeCompute()
  }, [debouncedOnResizeCompute, onResizeStart])

  useResizeObserver(ref, onResize)
}
