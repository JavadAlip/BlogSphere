import React from 'react'
import { IMGFOLDER } from '../url'

const HomePost = ({ post }) => {
  console.log(IMGFOLDER + post.photo);
  return (
    <div className='w-full flex mt-8 space-x-4 '>
      {/* left */}
      <div className='w-[35%] h-[200px] flex justify-center items-center'>
        <img src={IMGFOLDER + post.photo} alt="" className='h-full w-full rounded-lg object-cover' />
      </div>
      {/* right */}
      <div className='flex-col flex w-[65%]'>
        <h1 className="text-xl font-bold md:mb-1 mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className='flex mb-2 text-sm items-center justify-between text-gray-500 space-x-4 md:mb-4'>
          <p>@{post.username}</p>
          <div className='flex space-x-2'>
            <p>{new Date(post.updatedAt).toString().slice(4, 15)}</p>
            <p>-{new Date(post.updatedAt).toString().slice(15, 21)}</p>
          </div>
        </div>
        <p className='texr-sm md:text-lg '>{post.description.slice(0, 200)} <span style={{ color: 'grey', fontSize: 'medium' }}> Read more...</span></p>
      </div>
    </div>
  )
}
export default HomePost