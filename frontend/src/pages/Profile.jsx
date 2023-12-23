import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfilePosts from '../components/ProfilePosts';

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className='px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse items-start md:items-start'>
        <div className='flex flex-col md:w-[70%] w-full'>
          <h1 className='text-xl  font-bold mb-4'>Your posts</h1>
          <ProfilePosts />
          <ProfilePosts />
          <ProfilePosts />
        </div>
        <div className='md:sticky md:top-16 justify-start md:justify-end items-start flex md:w-[30%] w-full md:items-end'>
          <div className='flex flex-col space-y-4 items-start'>
            <h1 className='text-xl font-bold mb-4'>Update your profile</h1>
            <input
              className='outline-none rounded-lg border px-4 py-2 text-gray-500'
              placeholder='Username'
              type='text'
            />
            <input
              className='outline-none rounded-lg border px-4 py-2 text-gray-500'
              placeholder='E-Mail'
              type='email'
            />
            <input
              className='outline-none rounded-lg border px-4 py-2 text-gray-500'
              placeholder='Password'
              type='password'
            />
            <div className='flex items-center space-x-4 mt-8'>
              <button className='text-white rounded-lg font-semibold py-2 hover:text-black hover:bg-gray-400 bg-black px-4'>
                Update
              </button>
              <button className='text-white rounded-lg font-semibold py-2 hover:text-black hover:bg-gray-400 bg-black px-4'>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
