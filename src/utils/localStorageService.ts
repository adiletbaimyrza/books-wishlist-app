import { GoogleBooksApiResponse } from '../components'

type CollectionType = 'favourites' | 'read' | 'to read'

const getBooksFromLocalStorage = (
  collectionType: CollectionType
): GoogleBooksApiResponse[] => {
  const collectionString: string | null = localStorage.getItem(collectionType)
  const collectionParsed: GoogleBooksApiResponse[] =
    collectionString !== null ? JSON.parse(collectionString) : []

  return collectionParsed
}

const updateBooksInLocalStorageByCollection = (
  collectionType: CollectionType,
  newBooks: GoogleBooksApiResponse[]
): void => {
  localStorage.setItem(collectionType, JSON.stringify(newBooks))
}

const isInCollection = (
  collectionType: CollectionType,
  id: string
): boolean => {
  const collection = getBooksFromLocalStorage(collectionType)
  return id ? collection.some((item) => item.id === id) : false
}

type isInCollectionReturnType = {
  isInCollection: boolean
  collectionType: CollectionType | null
}

const isInCollections = (id: string): isInCollectionReturnType => {
  if (isInCollection('favourites', id)) {
    return {
      isInCollection: true,
      collectionType: 'favourites',
    }
  }
  if (isInCollection('read', id)) {
    return {
      isInCollection: true,
      collectionType: 'read',
    }
  }
  if (isInCollection('to read', id)) {
    return {
      isInCollection: true,
      collectionType: 'to read',
    }
  }
  return {
    isInCollection: false,
    collectionType: null,
  }
}

export {
  getBooksFromLocalStorage,
  updateBooksInLocalStorageByCollection,
  isInCollection,
  isInCollections,
}

export type { isInCollectionReturnType, CollectionType }
