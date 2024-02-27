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

export {
  getIdsFromLocalStorageByCollection,
  updateIdsInLocalStorageByCollection,
}
