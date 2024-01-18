import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfilePosts from '../components/ProfilePosts';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const { user, setUser } = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [error,setError]=useState('')

    // regex to profile details
    const usernameRegex = /^.{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // profile update
  const handleProfileUpdate = async () => {
    try {
      if (!username.match(usernameRegex) || /\s/.test(username)) {
        setError("Username at least 3 characters & can't contain whitespace!");
        return;
      }

      if (!email.match(emailRegex) || /\s/.test(email)) {
        setError('Invalid email address!');
        return;
      }
      const res = await axios.put(
        `${import.meta.env.VITE_URL}/api/users/` + user._id,
        { username, email },
        { withCredentials: true }
      );
      console.log(res.data);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 2000);
      setError(false);
    } catch (err) {
      console.error(err);
    }
  };

  // profile delete
  const handleProfileDelete = async () => {
    // js alert 
    const confirmed = window.confirm("Do you want to delete your account?");
    if (confirmed) {
      try {
        const res = await axios.delete(`${import.meta.env.VITE_URL}/api/users/` + user._id, { withCredentials: true });
        // Clear user state and any other client-side data
        setUser(null);
        // Clear the authentication cookie on the client-side
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/');
        toast.error('Account Deleted!', {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Profile delete canceled.");
    }
  };
  
  // user profile details fetch
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/users/` + id);
      setUsername(res.data.username);
      setEmail(res.data.email);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user, id]);

  // user posts fetch
  const fetchUserPost = async () => {
    try {
      console.log(`URL:, ${import.meta.env.VITE_URL}`);
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/posts/user/` + id);
      console.log('cooommmmm', res.data);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserPost();
    }
  }, [user, id]);

  return (
    <div>
      <Navbar />
      <div className='px-8 md:px-[200px]  flex md:flex-row flex-col-reverse items-start md:items-start'>
        <div className='flex flex-col mt-10 md:w-[70%] w-full'>
          <h1 className='text-xl font-bold '>My blogs:</h1>
          {posts.length === 0 ? (
            <p className='text-gray-500 mt-4'>No blogs available!</p>
          ) : (
            posts.map((p) => (
              <Link to={`/posts/post/${p._id}`} key={p._id}>
                <ProfilePosts p={p} />
              </Link>
            ))
          )}
        </div>
        <div className='md:sticky md:top-16 justify-start md:justify-end items-start flex md:w-[30%] w-full md:items-end'>
          <div className='flex flex-col space-y-4 mt-10 items-start'>
            <h1 className='text-xl font-bold mb-4'>Update profile:</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className='outline-none rounded-lg border px-4 py-2 text-gray-500'
              placeholder='Username'
              type='text'
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='outline-none rounded-lg border px-4 py-2 text-gray-500'
              placeholder='E-Mail'
              type='email'
            />
            <div className='flex items-center space-x-4 mt-8'>
            
              <button
                onClick={handleProfileUpdate}
                className='text-white rounded-lg font-semibold py-2 hover:text-black hover:bg-gray-400 bg-black px-4'
              >
                Update
              </button>
              
              {user && (
                <button
                  onClick={handleProfileDelete}
                  className='text-white rounded-lg font-semibold py-2 hover:text-black hover:bg-gray-400 bg-black px-4'
                >
                  Delete
                  <ToastContainer />
                </button>
              )}
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            {successMessage && <p className='text-green-500 mt-4'>{successMessage}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

