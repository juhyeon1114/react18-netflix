import React from 'react'
import styled from 'styled-components'
import { requests } from './api/requests'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Row from './components/Row'

const App = () => {
  return <div className='app'>
    <Nav></Nav>
    <Banner></Banner>
    
    {/* Rows */}
    <Row title="Netflix originals" id="NO" fetchUrl={requests.fetchNetflixOriginals} isLargeRow></Row>
    <Row title="Trending now" id="TN" fetchUrl={requests.fetchTrending}></Row>
    <Row title="Top rated" id="TR" fetchUrl={requests.fetchTopRated}></Row>
    <Row title="Action movies" id="AM" fetchUrl={requests.fetchActionMovies}></Row>
    {/* /Rows */}
    
    <Footer></Footer>
  </div>
}

export default App
