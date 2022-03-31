import {
  getCurrentTabster,
  createTabster,
  getTabsterAttribute,
  Types as TabsterTypes,
} from 'tabster'

/**
 * Tries to get a tabster instance on the current window or creates a new one
 * Since Tabster is single instance only, feel free to call this hook to ensure Tabster exists if necessary
 *
 * @internal
 * @returns Tabster core instance
 */
export const useTabster = (): TabsterTypes.TabsterCore | null => {
  const targetDocument = typeof document === 'object' ? document : undefined

  const defaultView = targetDocument?.defaultView || undefined
  const tabsterOptions: TabsterTypes.TabsterCoreProps = {
    autoRoot: {},
    controlTab: false,
  }

  if (!defaultView) {
    return null
  }

  // TODO: worth memoizing once more tabster options are used
  return (
    getCurrentTabster(defaultView) ?? createTabster(defaultView, tabsterOptions)
  )
}

export interface UseArrowNavigationGroupOptions {
  /**
   * Focus will navigate vertically, horizontally or in both directions (grid), defaults to horizontally
   * @defaultValue vertical
   */
  axis?: 'vertical' | 'horizontal' | 'grid'
  /**
   * Focus will cycle to the first/last elements of the group without stopping
   */
  circular?: boolean
  /**
   * Last focused element in the group will be remembered and focused (if still
   * available) when tabbing from outside of the group
   */
  memorizeCurrent?: boolean
}

/**
 * A hook that returns the necessary tabster attributes to support arrow key navigation
 * @param tabster
 * @param options - Options to configure keyboard navigation
 */
export const arrowNavigationGroup = (
  tabster: TabsterTypes.TabsterCore | null,
  options?: UseArrowNavigationGroupOptions
): TabsterTypes.TabsterAttributeProps => ({
    mover: {
      cyclic: !!options?.circular,
      direction: axisToMoverDirection(options?.axis ?? 'vertical'),
      memorizeCurrent: options?.memorizeCurrent,
    },
  })

function axisToMoverDirection(
  axis: UseArrowNavigationGroupOptions['axis']
): TabsterTypes.MoverDirection {
  switch (axis) {
    case 'horizontal':
      return TabsterTypes.MoverDirections.Horizontal
    case 'grid':
      return TabsterTypes.MoverDirections.Grid

    case 'vertical':
    default:
      return TabsterTypes.MoverDirections.Vertical
  }
}

export interface UseFocusableGroupOptions {
  /**
   * Behavior for the Tab key.
   */
  tabBehavior?: 'unlimited' | 'limited' | 'limitedTrapFocus'
}

/**
 * A hook that returns the necessary tabster attributes to support groupping.
 * @param tabster
 * @param options - Options to configure keyboard navigation
 */
export const focusableGroup = (
  tabster: TabsterTypes.TabsterCore | null,
  options?: UseFocusableGroupOptions
): TabsterTypes.TabsterAttributeProps => ({
    groupper: {
      tabbability: getTabbability(options?.tabBehavior),
    },
  })

const getTabbability = (
  tabBehavior?: UseFocusableGroupOptions['tabBehavior']
): TabsterTypes.GroupperTabbability | undefined => {
  switch (tabBehavior) {
    case 'unlimited':
      return TabsterTypes.GroupperTabbabilities.Unlimited
    case 'limited':
      return TabsterTypes.GroupperTabbabilities.Limited
    case 'limitedTrapFocus':
      return TabsterTypes.GroupperTabbabilities.LimitedTrapFocus
    default:
      return undefined
  }
}

export const focusable = (
  _tabster: TabsterTypes.TabsterCore | null,
  options?: TabsterTypes.FocusableProps
): TabsterTypes.TabsterAttributeProps => ({
    focusable: {
      ...options,
    },
  })

/**
 * Hook that returns tabster attributes
 */
export const useTabsterAttributes = (
  props: TabsterTypes.TabsterAttributeProps
): TabsterTypes.TabsterDOMAttribute => getTabsterAttribute(props)
