// import React, { useContext, useState } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { ImCross } from 'react-icons/im';
// import { UserContext } from '../context/UserContext';
// import axios from 'axios';
// import { Navigate, useNavigate } from 'react-router-dom';

// const CreatePost = () => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [file, setFile] = useState(null);
//     const { user } = useContext(UserContext);
//     const [cat, setCat] = useState('');
//     const [cats, setCats] = useState([]);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const deleteCategory = (i) => {
//         let updateCats = [...cats];
//         updateCats.splice(i, 1);
//         setCats(updateCats);
//     };

//     const addCategory = () => {
//         let updateCats = [...cats];
//         updateCats.push(cat);
//         setCat('');
//         setCats(updateCats);
//     };

//     const handleCreate = async (e) => {
//         e.preventDefault();

//         // regex on this page
//         // const titleRegex = /^.{1,}$/;
//         // if (!title.match(titleRegex)) {
//         //     setError('Title is empty!');
//         //     return;
//         // }
//         // const descRegex = /^.{1,}$/;
//         // if (!description.match(descRegex)) {
//         //     setError('Description is empty!');
//         //     return;
//         // }
//         const titleRegex = /\S.*\S/;
//         if (!title.match(titleRegex)) {
//             setError('Title is empty or contains only whitespace!');
//             return;
//         }

//         const descRegex = /\S.*\S/;
//         if (!description.match(descRegex)) {
//             setError('Description is empty or contains only whitespace!');
//             return;
//         }

//         const post = {
//             title,
//             description,
//             username: user.username,
//             userId: user._id,
//             categories: cats,
//         };
        
//         if (file) {
//             const data = new FormData();
//             const filename = Date.now() + file.name;
//             data.append('img', filename);
//             data.append('file', file);
//             post.photo = filename;

//             // upload img
//             try {
//                 const imgUpload = await axios.post(`${import.meta.env.VITE_URL}/api/upload`, data);
//                 console.log(imgUpload.data);
//             } catch (err) {
//                 console.log(err);
//             }
//         }

//         // upload post
//         try {
//             const res = await axios.post(`${import.meta.env.VITE_URL}/api/posts/create`, post, { withCredentials: true });
//             navigate('/posts/post/' + res.data._id);
//             console.log(res.data);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className='px-6 md:px-[200px] mt-8'>
//                 <h1 className='font-bold mt-8 md:text-2xl text-xl '>Create a blog</h1>
//                 <form action='' className='w-full flex mt-4 flex-col space-y-4 md:space-y-8'>
//                     <input
//                         onChange={(e) => setTitle(e.target.value)}
//                         className='px-4 py-2 outline-none  bg-gray-50 rounded-lg'
//                         placeholder='Blog title'
//                         type='text'
//                     />
//                     <input onChange={(e) => setFile(e.target.files[0])} className='px-4 ' type='file' />
//                     <div className='flex flex-col '>
//                         <div className='flex items-center space-x-4 md:space-x-8 '>
//                             <input
//                                 value={cat}
//                                 onChange={(e) => setCat(e.target.value)}
//                                 type='text'
//                                 placeholder='Blog category' />
//                             <div
//                                 onClick={addCategory}
//                                 className='bg-black rounded-lg text-white px-4 py-2 font-semibold cursor-pointer '>
//                                 Add
//                             </div>
//                         </div>
//                         <div className='flex px-4 mt-3'>
//                             {cats.map((c, i) => (
//                                 <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
//                                     <p>{c}</p>
//                                     <p onClick={() => deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross /></p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <textarea
//                         onChange={(e) => setDescription(e.target.value)}
//                         rows={15}
//                         cols={30}
//                         placeholder='Blog description'
//                         className='px-4 py-2 outline-none bg-gray-100 rounded-lg' />
//                     {error && <p className='text-red-500'>{error}</p>}
//                     <button
//                         onClick={handleCreate}
//                         className='bg-black w-full mdLw-[20%] rounded-lg px-4 py-2 md:text-xl text-lg mx-auto text-white font-semibold '>
//                         Create
//                     </button>
//                 </form>
//             </div>
//             <Footer />
//         </div>
//     );
// };
// export default CreatePost;


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
  const [file, setFile] = useState(null);
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

    if (file) {
      const data = new FormData();
      data.append('file', file);

      // upload img
      try {
        const imgUpload = await axios.post(`${VITE_URL}/api/upload`, data);
        console.log("Image upload response:",imgUpload.data);
      } catch (err) {
        console.log("Error uploading image:",err);
      }
    }

    // upload post
    try {
      const res = await axios.post(`${VITE_URL}/api/posts/create`, post, { withCredentials: true });
      navigate('/posts/post/' + res.data._id);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='px-6 md:px-[200px] mt-8'>
        <h1 className='font-bold mt-8 md:text-2xl text-xl '>Create a blog</h1>
        <form action='' className='w-full flex mt-4 flex-col space-y-4 md:space-y-8'>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className='px-4 py-2 outline-none  bg-gray-50 rounded-lg'
            placeholder='Blog title'
            type='text'
          />
          <input onChange={(e) => setFile(e.target.files[0])} className='px-4 ' type='file' />
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

