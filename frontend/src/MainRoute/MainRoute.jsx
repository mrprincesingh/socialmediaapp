
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Create from '../Pages/Create'
import VerifyUser from '../Pages/VerifyUser'
import SinglePost from '../Pages/SinglePost'
import EditPost from '../Pages/EditPost'
import TopLikedPosts from '../Pages/TopLikedPosts '
import User from '../Pages/User'
import SingleUserPage from '../Pages/SingleUserPage'

const MainRoute = () => {
  return (
   <Routes>
    <Route path="/create"  element={<Home/>} />
    <Route path="/"  element={<Create/>} />
    <Route path="/posts/:id"  element={<SinglePost/>} />
    <Route path="/posts/:id/edit"  element={<EditPost/>} />
    <Route path="/analytics/posts/top-liked"  element={<TopLikedPosts/>} />
    <Route path="/analytics/users"  element={<User/>} />
    <Route path="/users/:id" element={<SingleUserPage/>}/>

   </Routes>
  )
}

export default MainRoute