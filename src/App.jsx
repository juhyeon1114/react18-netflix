import React from 'react'
import { Outlet, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import DetailPage from './pages/DetailPage'
import SearchPage from './pages/SearchPage'
import HomePage from './pages/HomePage'

const Layout = () => {
  return <div className='app'>
    <Nav></Nav>
    <Outlet></Outlet>
    <Footer></Footer>
  </div>
}

const App = () => {
  return <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage></HomePage>}></Route>
        <Route path=":movieId" element={<DetailPage></DetailPage>}></Route>
        <Route path=":movieId" element={<SearchPage></SearchPage>}></Route>
      </Route>
    </Routes>
  </>
}

export default App
