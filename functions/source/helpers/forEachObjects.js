/**
 * object iterator
 * @param {object} object data to iterate
 * @param {Function} handler will be executed for each entity of the object
 */
const forEachObject = (object, handler) => {
  const keys = Object.keys(object)
  keys.forEach((currentKey) => {
    const currentValue = object[currentKey]
    handler(currentValue, currentKey)
  })
}

export default forEachObject
