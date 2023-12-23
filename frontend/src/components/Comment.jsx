import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'

const Comment = () => {
    return (
        <div className='px-2 py-2 bg-gray-200 rounded-lg my-2'>
            <div className='flex items-center justify-between'>
                <h3 className='font-bold text-gray-600'>@jvdali</h3>
                <div className='flex justify-center items-center space-x-3'>
                    <p className='text-gray-500 text-sm'>30/4/2020</p>
                    <p className='text-gray-500 text-sm'>10:45</p>
                    <div className='flex justify-center items-center space-x-1'>
                        <p><BiEdit /></p>
                        <p><MdDelete /></p>
                    </div>
                </div>
            </div>
            <p className='px-4 mt-2'>it is good!</p>
        </div>
    )
}

export default Comment