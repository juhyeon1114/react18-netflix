import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { api } from '../api/axios'
import MovieModal from './MovieModal'
import './Row.less'

const Row = ({title, fetchUrl, isLargeRow, id}) => {
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [modal, setModal] = useState([])
    const row = useRef();

    const fetchData = async () => {
        const req = await api.get(fetchUrl)
        setMovies(req.data.results)
    }

    const movieSrc = (movie, large = false) => {
        const selectedImagePath = large ? movie.poster_path : movie.backdrop_path
        const url = `https://image.tmdb.org/t/p/original/${selectedImagePath}`
        return url.replace('original//', 'original/')
    }

    const handleArrow = (left = false) => {
        if (left) {
            row.current.scrollLeft -= window.innerWidth + 80
        } else {
            row.current.scrollLeft += window.innerWidth + 80
        }
    }

    const handleClick = (movie) => {
        setSelectedMovie(movie)
        setModal(true)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <>
        <section className='row'>
            <h2>{title}</h2>
            <div className='slider'>
                <div className='slider__arrow-left' onClick={() => handleArrow(true)}>
                    <span className='arrow'>{'<'}</span>
                </div>
                
                <div id={id} className='row__posters' ref={row}>
                    {movies.map(movie => (
                        <LazyLoadImage
                            key={movie.id}
                            className={`row__poster ${isLargeRow ? 'row__posterLarge' : ''}`}
                            src={movieSrc(movie, isLargeRow)}
                            onClick={() => handleClick(movie)}
                        />
                    ))}
                </div>

                <div className='slider__arrow-right' onClick={() => handleArrow()}>
                    <span className='arrow'>{'>'}</span>
                </div>
            </div>
            { modal && selectedMovie && <MovieModal movie={selectedMovie} setModal={setModal}></MovieModal> }
        </section>
    </>
}

export default Row