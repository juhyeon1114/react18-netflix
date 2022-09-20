import React from 'react'
import styled from 'styled-components'
import { requests } from './api/requests'
import Banner from './components/Banner'
import Nav from './components/Nav'
import Row from './components/Row'

const AppWrapper = styled.div`
  * {
    margin: 0;
  }
  .app {
    background: #111;
  }
`

const App = () => {
  return <AppWrapper>
    <Nav></Nav>
    <Banner></Banner>
    <Row title="Netflix originals" id="NO" fetchUrl={requests.fetchNetflixOriginals} isLargeRow></Row>
    <Row title="Trending now" id="TN" fetchUrl={requests.fetchTrending}></Row>
    <Row title="Top rated" id="TR" fetchUrl={requests.fetchTopRated}></Row>
    <Row title="Action movies" id="AM" fetchUrl={requests.fetchActionMovies}></Row>
  </AppWrapper>
}

export default App
