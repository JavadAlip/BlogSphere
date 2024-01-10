import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfilePosts from '../components/ProfilePosts';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { URL } from '../url';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const { user } = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState('');

  // profile update
  const handleProfileUpdate = async () => {
    try {
      const res = await axios.put(
        URL + '/api/users/' + user._id,
        { username, email },
        { withCredentials: true }
      );
      console.log(res.data);
      
      // successMessage showing
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // profile delete
  const handleProfileDelete = async () => {
    // ... (implementation)
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + '/api/users/' + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      // setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  return (
    <div>
      <Navbar />
      <div className='px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse items-start md:items-start'>
        <div className='flex flex-col md:w-[70%] w-full'>
          <h1 className='text-xl font-bold mb-4'>Your blogs</h1>
          <ProfilePosts />
          <ProfilePosts />
          <ProfilePosts />
        </div>
        <div className='md:sticky md:top-16 justify-start md:justify-end items-start flex md:w-[30%] w-full md:items-end'>
          <div className='flex flex-col space-y-4 items-start'>
            <h1 className='text-xl font-bold mb-4'>Update your profile</h1>
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
            {/* <input
              // onChange={(e) => setPassword(e.target.value)}
              // value={password}
              className='outline-none rounded-lg border px-4 py-2 text-gray-500'
              placeholder='Password'
              type='password'
            /> */}
            <div className='flex items-center space-x-4 mt-8'>
              <button
                onClick={handleProfileUpdate}
                className='text-white rounded-lg font-semibold py-2 hover:text-black hover:bg-gray-400 bg-black px-4'
              >
                Update
              </button>
              <button
                onClick={handleProfileDelete}
                className='text-white rounded-lg font-semibold py-2 hover:text-black hover:bg-gray-400 bg-black px-4'
              >
                Delete
              </button>
            </div>
            {successMessage && (
        <p className='text-green-500 mt-4'>{successMessage}</p>
      )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

