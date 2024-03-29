import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import logo from '/Blog-logo1.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { VITE_URL,VITE_IMGFOLDER } from '../url';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const res = await axios.post(`${VITE_URL}/api/auth/login`, { email, password }, { withCredentials: true });
      setUser(res.data);
      console.log(res.data)
      toast.success('Login Successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });
      // Delay the redirection to ensure the toast is displayed before navigating
      setTimeout(() => {
        window.location.href = '/';
      }, 3000); 
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  return (
    <>
      <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
        <h1 className='text-lg md:text-xl font-extrabold' style={{ marginLeft: '-37px' }}>
          <Link to='/'>
            <img src={logo} style={{ height: '45px', width: '195px' }} alt='' />
          </Link>
        </h1>
        <h3>
          <Link to='/register'>Register</Link>{' '}
        </h3>
      </div>
      <div className='w-full flex justify-center items-center h-[70vh] '>
        <div className='flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]'>
          <h1 className='text-xl font-bold text-left'>Login your account</h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-4 rounded-full border-2 border-black outline-0'
            type='text'
            placeholder='E-Mail'/>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-4 rounded-full border-2 border-black outline-0'
            type='text'
            placeholder='Password'/>
          <button
            onClick={handleLogin}
            className='w-full px-4 py-4 font-bold text-white hover:bg-gray-500 hover:text-black bg-black rounded-full'>login</button>
          <ToastContainer/>
          {error && <h3 className='text-red-500 text-sm'>Invalid email or password!</h3>}
          <div className='flex justify-center items-center space-x-2'>
            <p>Don't have an account?</p>
            <p className='text-gray-500 hover:text-black'>
              <Link to='/register'>Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
