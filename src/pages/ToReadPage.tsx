import { RoutePageLayout } from '../components'

const ToReadPage = () => {
  let toRead: string[] = []
  const toReadStringified = localStorage.getItem('to read')

  if (toReadStringified !== null) {
    toRead = JSON.parse(toReadStringified)
  }

  return (
    <RoutePageLayout>
      {toRead.map((bookId) => (
        <div>{bookId}</div>
      ))}
    </RoutePageLayout>
  )
}

export default ToReadPage
