import { Link } from 'react-router-dom'
import { RoutePageLayout } from '../components'

const NotFoundPage = () => {
  return (
    <RoutePageLayout>
      NotFoundPage
      <Link to={'/'}>Go back to home</Link>
    </RoutePageLayout>
  )
}

export default NotFoundPage
