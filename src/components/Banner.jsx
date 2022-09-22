import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { api } from '../api/axios'
import { requests } from '../api/requests'
import './Banner.less'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`

const Banner = () => {
    const [movie, setMovie] = useState(null)
    const [clicked, setClicked] = useState(false)

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    const fetchData = async () => {
        const req = await api.get(requests.fetchNowPlaying)
        const movies = req.data.results
        const randomIdx = Math.floor(Math.random() * movies.length)
        const picked = movies[randomIdx]
        const videos = await getVideos(picked.id)
        picked.videos = videos
        setMovie(picked)
    }

    const onClickPlay = () => {
        setClicked(true)
    }

    const getVideos = async (id) => {
        try {
            const req = await api.get(requests.getVideos(id))
            return req.data.results
        } catch (error) {
            return []
        }
    }
    
    const videoUrl = useMemo(() => {
        return movie?.videos[0] ? `https://www.youtube.com/embed/${movie?.videos[0].key}?controls=0&autoplay=1&loop=1&mute=1` : '';
    }, [movie])

    const background = useMemo(() => {
        return movie ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`.replace('original//', 'original/') : '';
    }, [movie])

    const title = useMemo(() => {
        return movie ? movie.title || movie.name || movie.original_name : ''
    }, [movie])
    
    const overview = useMemo(() => {
        return movie?.overview ? truncate(movie.overview) : ''
    }, [movie])

    useEffect(() => {
        fetchData();
    }, [])

    if (!clicked) {
        return <>
            <header className='banner' style={{backgroundImage: background} }>
                <div className='banner__contents'>
                    <h1 className='banner__title'>{title}</h1>
                    <div className="banner__buttons">
                        {
                            videoUrl
                                ? <button className='banner__button play' onClick={() => onClickPlay()}>Play</button>
                                : <button className='banner__button play' disabled>No video</button>
                        }
                        <button className='banner__button info'>More information</button>
                    </div>
    
                    <p className='banner__description'>{overview}</p>
                </div>
                <div className='banner--fadeBottom'></div>
            </header>
        </>
    } else {
        return <>
            <Container className='banner'>
                <HomeContainer>
                    <Iframe
                        width="560"
                        height="315"
                        src={videoUrl}
                        frameborder="0"
                        allow="autoplay; fullscreen;"
                    />
                </HomeContainer>
            </Container>
        </>
    }
}

export default Banner