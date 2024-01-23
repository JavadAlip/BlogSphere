import React from 'react';
import {VITE_IMGFOLDER } from '../url';

const ProfilePosts = ({ p }) => {
  return (
    <div className='w-full flex mt-8 space-x-4 '>
      {/* left */}
      <div className='w-[35%] h-[200px] flex justify-center items-center'>
        <img src={VITE_IMGFOLDER + p.photo} alt="" className='h-full w-full object-cover rounded-lg' />
      </div>
      {/* right */}
      <div className='flex-col flex w-[65%]'>
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {p.title}
        </h1>
        <div className='flex mb-2 text-sm items-center justify-between font-semibold text-gray-500 space-x-4 md:mb-4'>
          <p>@{p.username}</p>
          <div className='flex space-x-2'>
            <p>{new Date(p.updatedAt).toString().slice(4, 15)}</p>
            <p>-{new Date(p.updatedAt).toString().slice(15, 21)}</p>
          </div>
        </div>
        <p className='text-sm md:text-lg'>{p.description.slice(0, 100)} <span style={{ color: 'grey', fontSize:'revert' }}>Read more...</span></p>
      </div>
    </div>
  );
}

export default ProfilePosts;