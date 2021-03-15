import { log } from 'firebase-functions/lib/logger'

/**
 * split list items by keyname, if keyname does not exist at item this item will be ignored
 * @param {Array} items items to split
 * @param {String} keyname key that will be used to divide
 * @returns {Object} itmes splite by keyname given
 */
const splitItems = (items, keyname) => {
  if (!items || !keyname) return null
  try {
    const splitedItems = {}
    items.forEach((currentItem) => {
      const currentKeynameValue = currentItem[keyname]
      if (currentKeynameValue) {
        const currentKeynameValueExistAtSplitedItems = splitedItems[currentKeynameValue]
        if (currentKeynameValueExistAtSplitedItems) {
          splitedItems[currentKeynameValue].push(currentItem)
        } else {
          splitedItems[currentKeynameValue] = [currentItem]
        }
      }
    })
    return splitedItems
  } catch (error) {
    log('splitItemsError', error)
    return null
  }
}

export default splitItems
