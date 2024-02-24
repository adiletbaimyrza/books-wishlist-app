import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type CustomNavLinkProps = {
  path: string
  faIcon: IconDefinition
  name: string
}

type RoutePageLayoutProps = {
  children: React.ReactNode
}

type SearchedBookProps = {
  id?: string
  title?: string
  authors?: string[]
  publishedDate?: string
  description?: string
  averageRating?: number
  ratingsCount?: number
  smallThumbnail?: string
}

export type { CustomNavLinkProps, RoutePageLayoutProps, SearchedBookProps }
