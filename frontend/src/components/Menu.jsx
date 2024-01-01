import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'
import axios from 'axios'
import { resolvePath } from 'react-router-dom'
const Menu = () => {
    const {user}=useContext(UserContext)
    const {setUser}=useContext(UserContext)
    // console.log(user)
    const handleLogout =async()=>{
      try {
       const res=await axios.get(URL+"/api/auth/logout",{withCredentials:true})
      //  console.log(res)
       setUser(null)
      } catch (err) {
        console.log(err)
      }
    }
  return (
    <div className=' bg-black w-[100px] rounded-lg space-y-1 p-4 absolute top-13 md:right-40 md:w-[100px] md:items-start right-6 flex-col flex items-start '>
   {!user && <h3  className='text-white text-sm hover:text-gray-500 cursor-pointer'>Login</h3>}
   {!user && <h3  className='text-white text-sm hover:text-gray-500 cursor-pointer'>Register</h3>}
   {user && <h3  className='text-white text-sm hover:text-gray-500 cursor-pointer'>Profile</h3>}
   {user && <h3  className='text-white text-sm hover:text-gray-500 cursor-pointer'>Create</h3>}
   {user && <h3  className='text-white text-sm hover:text-gray-500 cursor-pointer'>My Blog</h3>}
   {user && <h3  onClick={handleLogout} className='text-white text-sm hover:text-gray-500 cursor-pointer'>Logout</h3>}
    </div>
  )
}

export default Menu