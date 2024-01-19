import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars } from 'react-icons/fa';
import Menu from './Menu';
import { UserContext } from '../context/UserContext';
import logo from '/Blog-logo.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Navbar = () => {
    const [prompt, setPrompt] = useState('');
    const [menu, setMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const path = useLocation().pathname;
    const { user } = useContext(UserContext);
    const { setUser } = useContext(UserContext)
    const [username, setUsername] = useState('');
    const param = useParams().id;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // fetch username in navabar when who
    const fetchProfile = async () => {
        try {
            if (user && user._id) {
                const res = await axios.get('https://blogsphere-backend.onrender.com/api/users/' + user._id);
                setUsername(res.data.username);
                // setPassword(res.data.password);
                console.log("kittiye", user.data)
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [param]);
    const showMenu = () => {
        setMenu(!menu);
    };

    return (
        <div
            className={`flex items-center justify-between px-6 md:px-[200px] py-4 ${isScrolled ? 'fixed top-0 left-0 w-full bg-white shadow-md' : ''
                }`} >
            <h1 className='text-lg md:text-xl font-extrabold' style={{ marginLeft: '-37px' }}>
                <Link to='/'>
                    <img src={logo} style={{ height: '45px', width: '195px' }} alt='' />
                </Link>
            </h1>
            {path === '/' && (
                <div className='flex items-center space-x-0 justify-center  bg-gray-100 rounded-lg'>
                    <p
                        onClick={() => navigate(prompt ? '?search=' + prompt : navigate('/'))}
                        className='cursor-pointer'
                        style={{ marginLeft: '10px' }}>
                        <FaSearch />
                    </p>
                    <input
                        onChange={(e) => setPrompt(e.target.value)}
                        className='outline-none px-3 py-4 bg-gray-100 rounded-lg'
                        style={{ marginRight: '10px' }}
                        placeholder='Search a blog'
                        type='text' />
                </div>
            )}

            <div className='md:flex hidden items-center justify-center space-x-2 md:space-x-4'>
                {user ?
                    // <h3>
                    //     {' '}
                    //     <Link to='/create'>Logout</Link>
                    // </h3>
                    <h3>{username}</h3>
                    : (
                        <h3>
                            <Link to='/login'>Login</Link>{' '}
                        </h3>
                    )}
                {user ? (
                    <div onClick={showMenu}>
                        <p className='cursor-pointer relative'>
                            <FaBars />
                        </p>
                        {menu && <Menu />}
                    </div>
                ) : (
                    <h3>
                        <Link to='/register'>Register</Link>{' '}
                    </h3>
                )}
            </div>
            <div onClick={showMenu} className='md:hidden text-lg'>
                <p className='cursor-pointer relative'>
                    <FaBars />
                </p>
                {menu && <Menu />}
            </div>
        </div>
    );
};

export default Navbar;
