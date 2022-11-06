type ItemWrapper<T> = { value: T }

/**
 * A helper class for saving and loading data from local storage
 */
export default class SaveHelper {
  /**
   * Saves the given value to local storage
   */
  static save<T = any>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify({ value }))
  }

  /**
   * Loads a value from local storage using the given key
   * @param {String} key The key of the stored item
   * @param {Object} [storeObj] Allows the stored value to be loaded into the
   *          given object
   * @return {*} The stored value
   */
  static load<T>(key: string, storeObj = null): T | null {
    try {
      const item = localStorage.getItem(key)
      if (!item) {
        return null
      }

      const saveObj: ItemWrapper<any> = JSON.parse(item)
      const val = saveObj?.value ?? null
      if (!storeObj) {
        return val
      }

      // Assign value to storeObj if given
      if (typeof storeObj === 'object') {
        Object.assign(storeObj, val)
      } else {
        console.warn('Given "storeObj" is not an object, cannot store loaded value')
      }
      return val
    } catch (e) {
      console.error(e)
      return null
    }
  }
}
