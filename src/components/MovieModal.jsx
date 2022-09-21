import React from 'react'
import { useMemo } from 'react'
import './MovieModal.less'

const MovieModal = ({movie, setModal}) => {
  const date = useMemo(() => movie?.release_date || movie?. first_air_date || '', [movie])
  const title = useMemo(() => movie?.title || movie?.name || '', [movie])
  const avg = useMemo(() => movie?.vote_average || '', [movie])
  const overview = useMemo(() => movie?.overview || '', [movie])
  const bgImage = useMemo(() => `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`, [movie])
  const closeModal = () => setModal(false)

  return <div className='presentation'>
    <div className="wrapper-modal">
      <div className="modal">
        <span className='modal-close' onClick={() => closeModal()}>X</span>
        <img className='modal__poster-img' src={bgImage} alt="modal__poster-img" />
        <div className="modal__content">
          <p className="modal__details">
            <span className="modal__user_perc">100% for you</span>{date}
          </p>
          <h2 className='modal__title'>{title}</h2>
          <h2 className='modal__overview'>평정: {avg}</h2>
          <h2 className='modal__overview'>{overview}</h2>
        </div>
      </div>
    </div>
  </div>
}

export default MovieModal