
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Create from '../Pages/Create'
import VerifyUser from '../Pages/VerifyUser'

const MainRoute = () => {
  return (
   <Routes>
    <Route path="/"  element={<Home/>} />
    <Route path="/create"  element={<Create/>} />
    <Route path="/verifyuser"  element={<VerifyUser/>} />
   </Routes>
  )
}

export default MainRoute