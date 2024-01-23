import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VITE_URL } from '../url';
const Menu = () => {
  const { user } = useContext(UserContext)
  const { setUser } = useContext(UserContext)
  // console.log(user)

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${VITE_URL}/api/auth/logout`, { withCredentials: true })
      //  console.log(res)
      setUser(null)
      toast.error('Logout Successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });
      // Delay the redirection to ensure the toast is displayed before navigating
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);

    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='bg-black w-[100px] rounded-lg space-y-1 p-4 absolute z-10 top-13 md:right-40 md:w-[100px] md:items-start right-6 flex-col flex items-start'>
      {!user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'> <Link to="/login">Login</Link></h3>}
      {!user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to="/register">Register</Link></h3>}
      {user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'> <Link to="/create">Create</Link> </h3>}
      {user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'> <Link to={"/profile/" + user._id}>Profile</Link> </h3>}
      {/* {user && <h3  className='text-white text-sm hover:text-gray-500 cursor-pointer'> <Link to={"/myblogs/"+user._id}> My Blog</Link></h3>} */}
      {user && <h3 onClick={handleLogout} className='text-white text-sm hover:text-gray-500 cursor-pointer'>Logout</h3>}
      <ToastContainer />
    </div>

  )
}
export default Menu