import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import MyBlogs from './pages/MyBlogs';

import { UserContextProvider } from './context/UserContext';

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts/post/:id" element={<PostDetails />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/myblogs/:id" element={<MyBlogs />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/comment" element={<Comment />} />
      </Routes>
      <ToastContainer />
    </UserContextProvider>
  );
};
export default App;
