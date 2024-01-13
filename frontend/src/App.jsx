import './app.css'
import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import { UserContextProvider } from './context/UserContext.jsx'
import MyBlogs from './pages/MyBlogs.jsx'
// Example in App.js or your main layout component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/posts/post/:id" element={<PostDetails />} />
        <Route exact path="/create" element={<CreatePost />} />
        <Route exact path="/edit/:id" element={<EditPost />} />
        <Route exact path="/myblogs/:id" element={<MyBlogs />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/comment" element={<Comment />} />
      </Routes>
      <ToastContainer />
      </UserContextProvider>
  )
}
export default App