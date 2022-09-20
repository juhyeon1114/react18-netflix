import React, { useEffect, useMemo, useState } from 'react'
import { api } from '../api/axios'
import { requests } from '../api/requests'
import './Banner.less'

const Banner = () => {
    const [movie, setMovie] = useState(null)

    const background = useMemo(() => {
        return movie ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")` : '';
    }, [movie])

    const title = useMemo(() => {
        return movie ? movie.title || movie.name || movie.original_name : ''
    }, [movie])
    
    const overview = useMemo(() => {
        return movie?.overview || ''
    }, [movie])


    const fetchData = async () => {
        const req = await api.get(requests.fetchNowPlaying)
        const movies = req.data.results
        const randomIdx = Math.floor(Math.random() * movies.length)
        const picked = movies[randomIdx]
        setMovie(picked)
    }

    const truncate = (str, n) => {
        
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <header className='banner' style={
            {backgroundImage: background}
        }>
            <div className='banner__contents'>
                <h1 className='banner__title'>{title}</h1>
                <div className="banner__buttons">
                    <button className='banner__button play'>Play</button>
                    <button className='banner__button info'>More information</button>
                </div>

                <p className='banner__description'>{overview}</p>
            </div>
            <div className='banner--fadeBottom'></div>
        </header>
    )
}

export default Banner