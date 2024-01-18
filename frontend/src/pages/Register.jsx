import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';
import logo from '/Blog-logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // regex to auth details
  const usernameRegex = /^.{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{8,}$/;

  const handleRegister = async () => {
    try {
      if (!username.match(usernameRegex) || /\s/.test(username)) {
        setError('Username at least 3 characters & cannot contain whitespace!');
        return;
      }

      if (!email.match(emailRegex) || /\s/.test(email)) {
        setError('Invalid email address!');
        return;
      }

      if (!password.match(passwordRegex) || /\s/.test(password)) {
        setError('Password at least 8 characters & cannot contain whitespace!');
        return;
      }

      const res = await axios.post('https://blogsphere-o6fp.onrender.com/api/auth/register', {
        username,
        email,
        password,
      });
      toast.success('Register Successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);

      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate('/login');
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <>
      <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
        <h1 className='text-lg md:text-xl font-extrabold' style={{ marginLeft: '-37px' }}><Link to="/"><img src={logo} style={{ height: '45px', width: '195px' }} alt="" /></Link></h1>
        <h3>
          <Link to="/login">Login</Link>
        </h3>
      </div>
      <div className='w-full flex justify-center items-center h-[80vh] '>
        <div className='flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]'>
          <h1 className='text-xl font-bold text-left'>Create an account</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className='w-full px-4 py-4 rounded-full border-2 border-black outline-0'
            type='text'
            placeholder='Username'
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-4 rounded-full border-2 border-black outline-0'
            type='text'
            placeholder='E-Mail'
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-4 rounded-full border-2 border-black outline-0'
            type='text'
            placeholder='Password'

          />
          <button
            onClick={handleRegister}
            className='w-full px-4 py-4 font-bold text-white hover:bg-gray-500 hover:text-black bg-black rounded-full'
          >
            Register
          </button>
          <ToastContainer />
          {error && <h3 className='text-red-500 text-sm'>{error}</h3>}
          <div className='flex justify-center items-center space-x-2'>
            <p>Already have an account?</p>
            <p className='text-gray-500 hover:text-black'>
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
