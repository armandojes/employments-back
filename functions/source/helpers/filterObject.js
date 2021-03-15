/**
 * filter object properties by keys allowed
 * @param {{}} object data to format
 * @param {Array} allows properties allowed
 */
const filterObject = (object = {}, allows = []) => {
  const secureObject = {}
  allows.forEach((currentKey) => {
    const currentValue = object[currentKey]
    if (currentValue !== null && currentValue !== undefined) {
      secureObject[currentKey] = currentValue
    }
  })
  return secureObject
}

export default filterObject
