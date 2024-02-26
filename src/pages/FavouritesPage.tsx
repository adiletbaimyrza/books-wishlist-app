import { RoutePageLayout } from '../components'

const FavouritesPage = () => {
  let favourites: string[] = []
  const favouritesRaw = localStorage.getItem('favourites')

  if (favouritesRaw !== null) {
    favourites = JSON.parse(favouritesRaw)
  }

  return (
    <RoutePageLayout>
      {favourites.map((fav) => (
        <div>{fav}</div>
      ))}
    </RoutePageLayout>
  )
}

export default FavouritesPage
