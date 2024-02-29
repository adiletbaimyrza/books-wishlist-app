import { GoogleBooksApiResponse } from '../components'
import { CollectionType } from './utils.types'

class LocalStorageService {
  getBooks(collectionType: CollectionType): GoogleBooksApiResponse[] {
    const collectionString: string | null = localStorage.getItem(collectionType)
    const collectionParsed: GoogleBooksApiResponse[] =
      collectionString !== null ? JSON.parse(collectionString) : []

    return collectionParsed
  }

  updateBooks(
    collectionType: CollectionType,
    newBooks: GoogleBooksApiResponse[]
  ): void {
    localStorage.setItem(collectionType, JSON.stringify(newBooks))
  }

  isInCollection(collectionType: CollectionType, id: string): boolean {
    const collection = this.getBooks(collectionType)
    return id ? collection.some((item) => item.id === id) : false
  }

  isInCollections(id: string): {
    isInCollection: boolean
    collectionType: CollectionType | null
  } {
    const collectionTypes: CollectionType[] = ['favourites', 'read', 'to read']

    for (const collectionType of collectionTypes) {
      if (this.isInCollection(collectionType, id)) {
        return {
          isInCollection: true,
          collectionType,
        }
      }
    }

    return {
      isInCollection: false,
      collectionType: null,
    }
  }
}

export default new LocalStorageService()
export type { CollectionType }
