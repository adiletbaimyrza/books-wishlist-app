type Route = {
  index?: boolean
  path: string
  element: React.ReactNode
  errorElement?: React.ReactNode
}

type CollectionType = 'favourites' | 'read' | 'to read'

type isInCollectionReturnType = {
  isInCollection: boolean
  collectionType: CollectionType | null
}

export type { Route, CollectionType, isInCollectionReturnType }
