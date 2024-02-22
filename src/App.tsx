const API_KEY: string = 'AIzaSyD-2SYYVG-vCeLhk5x0c0PxtPONd8twS_M'

import axios from 'axios'

function App() {
  const fetchData = () => {
    axios
      .get(
        'https://www.googleapis.com/books/v1/volumes?q=react&filter=free-ebooks&key=AIzaSyD-2SYYVG-vCeLhk5x0c0PxtPONd8twS_M'
      )
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }
  return (
    <>
      <input type="text" />
      <button onClick={fetchData}>Search</button>
    </>
  )
}

export default App
