type Collection = 'favourite' | 'read' | 'to read'

const getIdsFromLocalStorageByCollection = (
  collection: Collection
): string[] => {
  const collectionString: string | null = localStorage.getItem(collection)
  const collectionParsed: string[] =
    collectionString !== null ? JSON.parse(collectionString) : []

  return collectionParsed
}

export { getIdsFromLocalStorageByCollection }
