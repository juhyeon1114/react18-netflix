import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { api } from '../api/axios'
import './Row.less'

const Row = ({title, fetchUrl, isLargeRow, id}) => {
    const [movies, setMovies] = useState([])

    const fetchData = async () => {
        const req = await api.get(fetchUrl)
        setMovies(req.data.results)
    }

    const movieSrc = (movie, large = false) => {
        const selectedImagePath = large ? movie.poster_path : movie.backdrop_path
        const url = `https://image.tmdb.org/t/p/original/${selectedImagePath}`
        return url.replace('original//', 'original/')
    }


    useEffect(() => {
        fetchData()
    }, [])

    return <section className='row'>
        <h2>{title}</h2>
        <div className='slider'>
            <div className='slider__arrow-left'>
                <span className='arrow'>{'<'}</span>
            </div>
            
            <div id={id} className='row__posters'>
                {movies.map((movie, idx) => (
                    <LazyLoadImage key={movie.id} className={`row__poster ${isLargeRow ? 'row__posterLarge' : ''}`} src={movieSrc(movie, isLargeRow)} />
                ))}
            </div>

            <div className='slider__arrow-right'>
                <span className='arrow'>{'>'}</span>
            </div>
        </div>
    </section>
}

export default Row