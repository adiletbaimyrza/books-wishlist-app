type Route = {
  index?: boolean
  path: string
  element: React.ReactNode
  errorElement?: React.ReactNode
}

type CollectionType = 'favourites' | 'read' | 'to read'

export type { Route, CollectionType }
