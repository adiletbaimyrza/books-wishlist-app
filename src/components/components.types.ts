import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type CustomNavLinkProps = {
  path: string
  faIcon: IconDefinition
  name: string
}

type RoutePageLayoutProps = {
  children: React.ReactNode
}

type GridBookProps = {
  id?: string
  title?: string
  authors?: string[]
  publishedDate?: string
  description?: string
  averageRating?: number
  ratingsCount?: number
  smallThumbnail?: string
}

type GoogleBooksApiResponse = {
  id: string
  averageRating: number
  volumeInfo: {
    title: string
    description: string
    authors: string[]
    publisher: string
    publishedDate: string
    imageLinks: {
      thumbnail: string
      smallThumbnail: string
    }
  }
  saleInfo: {
    buyLink: string
  }
  accessInfo: {
    pdf: {
      isAvailable: boolean
      downloadLink: string
    }
  }
}

export type {
  CustomNavLinkProps,
  RoutePageLayoutProps,
  GridBookProps,
  GoogleBooksApiResponse,
}
