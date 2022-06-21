function sessionKey(actionId: string) {
  return `fuib-input__${actionId}`
}

export const putInputValue = (actionId: string, value: string | string[]) =>
  document.defaultView?.sessionStorage.setItem(
    sessionKey(actionId),
    JSON.stringify(value)
  )

export const deleteInputValue = (actionId: string) =>
  document.defaultView?.sessionStorage.removeItem(sessionKey(actionId))

export const getInputValue = (actionId: string) => {
  const value = document.defaultView?.sessionStorage.getItem(
    sessionKey(actionId)
  )
  return value ? JSON.parse(value) : null
}

export const getInputValues = (actionIds: string[]) =>
  actionIds.reduce(
    (acc: Record<string, string | string[] | null>, actionId) => {
      acc[actionId] = getInputValue(actionId)
      return acc
    },
    {}
  )
