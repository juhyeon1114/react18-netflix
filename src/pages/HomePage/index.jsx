import React from 'react'
import Banner from '../../components/Banner'
import Row from '../../components/Row'
import {requests} from '../../api/requests'

const HomePage = () => {
  return <>
    <Banner></Banner>
    <Row title="Netflix originals" id="NO" fetchUrl={requests.fetchNetflixOriginals} isLargeRow></Row>
    <Row title="Trending now" id="TN" fetchUrl={requests.fetchTrending}></Row>
    <Row title="Top rated" id="TR" fetchUrl={requests.fetchTopRated}></Row>
    <Row title="Action movies" id="AM" fetchUrl={requests.fetchActionMovies}></Row>
  </>
}

export default HomePage
