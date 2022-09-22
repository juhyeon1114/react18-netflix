import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../api/axios'
import { requests } from '../../api/requests'

const DetailPage = () => {
  const [movie, setMovie] = useState({})
  const params = useParams()

  const fetchMovie = async (movieId) => {
    const req = await api(requests.getDetail(movieId))
    setMovie(req.data)
    console.log(req.data)
  }

  useEffect(() => {
    fetchMovie(params.movieId)
  }, [])

  if (!movie?.id) {
    return <div>Loaindg...</div>
  } else {
    return <section>
      <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} style={{width: '100%'}} alt="" />
    </section>
  }
}

export default DetailPage