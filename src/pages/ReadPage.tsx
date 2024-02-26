import { RoutePageLayout } from '../components'

const ReadPage = () => {
  let read: string[] = []
  const readStringified = localStorage.getItem('read')

  if (readStringified !== null) {
    read = JSON.parse(readStringified)
  }

  return (
    <RoutePageLayout>
      {read.map((bookId) => (
        <div>{bookId}</div>
      ))}
    </RoutePageLayout>
  )
}

export default ReadPage
