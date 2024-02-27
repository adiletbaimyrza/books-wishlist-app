type Collection = 'favourites' | 'read' | 'to read'

const getIdsFromLocalStorageByCollection = (
  collection: Collection
): string[] => {
  const collectionString: string | null = localStorage.getItem(collection)
  const collectionParsed: string[] =
    collectionString !== null ? JSON.parse(collectionString) : []

  return collectionParsed
}

const updateIdsInLocalStorageByCollection = (
  collection: Collection,
  newIds: string[]
): void => {
  localStorage.setItem(collection, JSON.stringify(newIds))
}

const isInCollection = (collectionName: Collection, id: string): boolean => {
  const collection = getIdsFromLocalStorageByCollection(collectionName)
  return id ? collection.includes(id) : false
}

type isInCollectionReturnType = {
  isInCollection: boolean
  collection: Collection | null
}

const isInCollections = (id: string): isInCollectionReturnType => {
  if (isInCollection('favourites', id)) {
    return {
      isInCollection: true,
      collection: 'favourites',
    }
  }
  if (isInCollection('read', id)) {
    return {
      isInCollection: true,
      collection: 'read',
    }
  }
  if (isInCollection('to read', id)) {
    return {
      isInCollection: true,
      collection: 'to read',
    }
  }
  return {
    isInCollection: false,
    collection: null,
  }
}

export {
  getIdsFromLocalStorageByCollection,
  updateIdsInLocalStorageByCollection,
  isInCollection,
  isInCollections,
}

export type { isInCollectionReturnType, Collection }
