export function storageFactory(storage: any) {
  let inMemoryStorage: any = {}
  function isSupported() {
    try {
      const testKey = '__some_random_key_you_are_not_going_to_use__'
      storage.setItem(testKey, testKey)
      storage.removeItem(testKey)
      return true
    } catch (e) {
      return false
    }
  }

  function clear() {
    if (isSupported()) {
      storage.clear()
    } else {
      inMemoryStorage = {}
    }
  }

  function getItem(name: string) {
    if (isSupported()) {
      return JSON.parse(storage.getItem(name))
    }
    if (Object.prototype.hasOwnProperty.call(inMemoryStorage, name)) {
      return inMemoryStorage[name]
    }
    return null
  }

  function key(index: any) {
    if (isSupported()) {
      return storage.key(index)
    } else {
      return Object.keys(inMemoryStorage)[index] || null
    }
  }

  function removeItem(name: string) {
    if (isSupported()) {
      storage.removeItem(name)
    } else {
      delete inMemoryStorage[name]
    }
  }

  function setItem(name: string, value: any) {
    if (isSupported()) {
      storage.setItem(name, JSON.stringify(value))
    } else {
      inMemoryStorage[name] = String(value)
    }
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
    key
  }
}

export const localStore = storageFactory(localStorage)
export const sessionStore = storageFactory(sessionStorage)
