import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import img from '../assets/Screenshott.png'
import Comment from '../components/Comment'

const PostDetails = () => {
  return (
    <div>
        <Navbar/>
        <div className='px-8 md:px-[200px] mt-8 '>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold md:text-3xl text-black'>this is samp</h1>
                <div className='flex items-center justify-center space-x-2'>
                    <p><BiEdit/></p>
                    <p><MdDelete/></p>
                </div>
            </div>
            <div className='flex items-center justify-between mt-2 md:mt-4 '>
            <p>@smaoleone</p>
          <div className='flex space-x-2'>
            <p>23/04/2020</p>
            <p>2:09 </p>
          </div>
            </div>
            <img src={img} alt=""  className='w-full mx-auto mt-8 '/>
            <p className='mx-auto mt-8 '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <div className='flex items-center mt-8 space-x-4 font-semibold'>
                <p>Categories</p>
                <div className='flex justify-center items-center space-x-2'>
                    <div className='bg-gray-300 rounded-lg px-3 py-1'>Tech</div>
                    <div className='bg-gray-300 rounded-lg px-3 py-1'>It</div>
                </div>
            </div>
            <div className='flex flex-col mt-4'>
                <h3 className='mt-6 mb-4 font-semibold'>Comments</h3>
                <Comment/>
                <Comment/>
            </div>
            {/* write a comment */}
            <div className='w-full flex flex-col mt-4 md:flex-row '>
                <input className='md:w-[80%] md:mt-0 outline-none px-4 mt-4 rounded-lg' type="text" placeholder='Write a comment'/>
                <button className='bg-black text-sm text-white rounded-lg md:w-[20%] mt-4 md:mt-0 px-4 py-2'>Add Comment</button>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default PostDetails