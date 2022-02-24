/**
 * Pass in an element and its CSS Custom Property that you want the value of.
 * Optionally, you can determine what datatype you get back.
 *
 * @param {String} propKey
 * @param {HTMLELement} element=document.documentElement
 * @param {String} castAs='string'
 * @returns {*}
 */
export const getCssCustomProperty = (
  propKey: string,
  element = document.documentElement,
  castAs = 'string'
) => {
  if (!element) {
    return null
  }

  let response = getComputedStyle(element).getPropertyValue(propKey)

  // Tidy up the string if there's something to work with
  if (response.length) {
    response = response.replace(/\'|"/g, '').trim()
  }

  // Convert the response into a whatever type we wanted
  switch (castAs) {
    case 'number':
    case 'int':
      return parseInt(response, 10)
    case 'float':
      return parseFloat(response)
    case 'boolean':
    case 'bool':
      return response === 'true' || response === '1'
  }

  // Return the string response by default
  return response
}
