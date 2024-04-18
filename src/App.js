import { useEffect, useState } from 'react'
import { getMovieList, searchMovie } from './api'

const App = () => {
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then(result => {
      setPopularMovies(result)
    })
  }, [])
  
  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className='bg-white p-4 rounded-lg mb-4 shadow-md flex flex-col gap-4' key={i}>
          <div className="aspect-w-16 aspect-h-9 relative">
            <img className='object-cover rounded-lg' alt='' src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg">
              <div className="text-white text-center">
                {movie.title}
              </div>
            </div>
          </div>
          <div className='text-sm text-gray-600'>Release Date: {movie.release_date}</div>
          <div className='text-sm text-gray-600'>Rating: {movie.vote_average}</div>
        </div>
      )
    })
  }

  const search = async (q) => {
    if (q.length > 3 ){
      const query = await searchMovie(q)
      setPopularMovies(query.results)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Ac-Movie</h1>
        <input 
          placeholder='Cari film kesayangan' 
          className='w-64 border border-gray-300 rounded-md px-4 py-2 mt-4 focus:outline-none focus:ring focus:ring-blue-200'
          onChange={({ target }) => search(target.value)}  
        />
      </header>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5'>
        <PopularMovieList />
      </div>
    </div>
  )
}

export default App
