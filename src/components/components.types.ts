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
  smallThumbnail?: string
}

type ReviewProps = {
  book: GoogleBooksApiResponse
}

type GoogleBooksApiResponse = {
  id?: string
  review?: string
  reviewTitle?: string
  averageRating?: number
  volumeInfo?: {
    title?: string
    description?: string
    authors?: string[]
    publisher?: string
    publishedDate?: string
    imageLinks?: {
      thumbnail?: string
      smallThumbnail?: string
    }
    averageRating?: number
  }
  saleInfo?: {
    buyLink?: string
  }
  accessInfo?: {
    pdf?: {
      isAvailable?: boolean
      downloadLink?: string
    }
  }
}

type NotificationProps = {
  open: boolean
  onClose: () => void
  message: string
}

export type {
  CustomNavLinkProps,
  RoutePageLayoutProps,
  GridBookProps,
  GoogleBooksApiResponse,
  ReviewProps,
  NotificationProps,
}
