import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '../../api/axios'
import './SearchPage.less'

const SearchPage = () => {
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])

  const useQuery = () => {
    return new URLSearchParams(location.search)
  }

  const fetchSearchedMovie = async (str) => {
    try {
      const req = await api.get(`/search/multi?include_adult=false&query=${str}`)
      setResults(req.data.results)
    } catch (error) {
      console.error(error);
      setResults([])
    }
  }

  useEffect(() => {
    let query = useQuery();
    setSearchTerm(query.get('q'))
    fetchSearchedMovie(searchTerm)
  }, [location])

  if (results?.length > 0) {
    return <>
      <section className='search-container'>
        {results.map(movie => {
          if (movie.backdrop_path !== null && movie.media_type !== 'person') {
            const url = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
            return <div className="movie" key={movie.id}>
              <div className="movie__column-poster">
                <img src={url} className="movie__poster" />
              </div>
            </div>
          }
        })}
      </section>
    </>
  } else {
    return <>
      <section className='no-results'>
        <div className="no-results__text">
          <p>찾으려는 검색어"{searchTerm}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    </>
  }
}

export default SearchPage