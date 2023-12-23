import React from 'react'
const HomePost = () => {
  return (
    <div className='w-full flex mt-8 space-x-4'>
      {/* left */}
      <div className='w-[35%] h-[200px] flex justify-center items-center'>
        <img src="" alt="" />
      </div>
      {/* right */}
      <div className='flex-col flex w-[65%]'>
        <h1 classname="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          this is sample blog
        </h1>
        <div className='flex mb-2 text-sm font-semibold text-gray-10 space-x-4 md:mb-4'>
          <p>@smaoleone</p>
          <div className='flex space-x-2'>
            <p>23/04/2020</p>
            <p>2:09 </p>
          </div>
        </div>
        <p className='texr-sm md:text-lg'> this is blog description</p>
      </div>
    </div>
  )
}
export default HomePost