import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type CustomNavLinkProps = {
  path: string
  faIcon: IconDefinition
  name: string
}

type RoutePageLayoutProps = {
  children: React.ReactNode
}

export type { CustomNavLinkProps, RoutePageLayoutProps }
