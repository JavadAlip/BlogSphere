


import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ImCross } from 'react-icons/im';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { VITE_URL } from '../url';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState("");
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState('');
  const [cats, setCats] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const deleteCategory = (i) => {
    let updateCats = [...cats];
    updateCats.splice(i, 1);
    setCats(updateCats);
  };

  const addCategory = () => {
    let updateCats = [...cats];
    updateCats.push(cat);
    setCat('');
    setCats(updateCats);
  };

  const handleCreate = async (e) => {

    // Example URLs:
    const uploadUrl = `${VITE_URL}/api/upload`;
    const createPostUrl = `${VITE_URL}/api/posts/create`;
    console.log('Upload URL:', uploadUrl);
    console.log('Create Post URL:', createPostUrl);


    e.preventDefault();

    const titleRegex = /\S.*\S/;
    if (!title.match(titleRegex)) {
      setError('Title is empty or contains only whitespace!');
      return;
    }

    const descRegex = /\S.*\S/;
    if (!description.match(descRegex)) {
      setError('Description is empty or contains only whitespace!');
      return;
    }

    const post = {
      title,
      description,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    // Check if an image is selected
   
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'blogssphere');
        data.append('cloud_name', 'doue07abb');

        // Upload image to Cloudinary
       fetch(
            'https://api.cloudinary.com/v1_1/doue07abb/image/upload',
            {
              method: 'post',
              body: data,
            }
          );
          

    // Upload post

    try {
      const res = await axios.post(
        `${VITE_URL}/api/posts/create`,
        post,
        { withCredentials: true }
      );
      navigate('/posts/post/' + res.data._id);
      console.log('Post created successfully:', res.data);
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };


  return (
    <div>
      <Navbar />
      <div className='px-6 md:px-[200px] mt-8'>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          className='px-4 '
          type='file'
        />
        <h1 className='font-bold mt-8 md:text-2xl text-xl '>Create a blog</h1>
        <form action='' className='w-full flex mt-4 flex-col space-y-4 md:space-y-8'>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className='px-4 py-2 outline-none  bg-gray-50 rounded-lg'
            placeholder='Blog title'
            type='text'
          />
          <div className='flex flex-col '>
            <div className='flex items-center space-x-4 md:space-x-8 '>
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                type='text'
                placeholder='Blog category'
              />
              <div
                onClick={addCategory}
                className='bg-black rounded-lg text-white px-4 py-2 font-semibold cursor-pointer '
              >
                Add
              </div>
            </div>
            <div className='flex px-4 mt-3'>
              {cats.map((c, i) => (
                <div
                  key={i}
                  className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            rows={15}
            cols={30}
            placeholder='Blog description'
            className='px-4 py-2 outline-none bg-gray-100 rounded-lg'
          />
          {error && <p className='text-red-500'>{error}</p>}
          <button
            onClick={handleCreate}
            className='bg-black w-full mdLw-[20%] rounded-lg px-4 py-2 md:text-xl text-lg mx-auto text-white font-semibold '
          >
            Create
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
