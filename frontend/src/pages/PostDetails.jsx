// import React, { useContext, useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { BiEdit } from 'react-icons/bi';
// import { MdDelete } from 'react-icons/md';
// import Comment from '../components/Comment';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { UserContext } from '../context/UserContext';
// import Loader from '../components/Loader';

// const PostDetails = () => {
//   const postId = useParams().id;  
//   const [post, setPost] = useState({});
//   const { user } = useContext(UserContext);
//   const [loader, setLoader] = useState(false);
//   const navigate = useNavigate();
//   const [comments, setComments] = useState([]);
//   const [comment, setComment] = useState('');

//   const fetchPost = async () => {
//     setLoader(true);
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_URL}/api/posts/`+ postId);
//       setPost(res.data);
//       setLoader(false);
//     } catch (err) {
//       console.error('Error fetching post:', err);
//       setLoader(true);
//     }
//   };

//   // post delete
//   const handleDltPost = async () => {
//     const confirmed=window.confirm("Do you want to delete your blog?")
//     if(confirmed){
//     try {
//       const res = await axios.delete(`${import.meta.env.VITE_URL}/api/posts/`+ postId, {
//         withCredentials: true,
//       });
//       console.log(res.data);
//       navigate('/');
//     } catch (err) {
//       console.log(err);
//     }
//   }else{
//     alert("Blog delete canceled.")
//   }
//   };

//   useEffect(() => {
//     fetchPost();
//   }, [postId]);

//   const fetchPostComments = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_URL}/api/comments/post/` + postId);
//       setComments(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchPostComments();
//   }, [postId]);

//   const postComment = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_URL}/api/comments/create`,
//         {
//           comment: comment,
//           author: user.username,
//           postId: postId,
//           userId: user._id,
//         },
//         { withCredentials: true }
//       );
//       console.log('comment posted', res.data);
//       fetchPostComments(); // Refresh comments after posting
//       setComment('');
//       window.location.reload(true);

//     } catch (err) {
//       console.log('Error posting comment:', err);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       {loader ? (
//         <div className='h-[80vh] flex justify-center items-center'>
//           <Loader />
//         </div>
//       ) : (
//         <div className='px-8 md:px-[200px] mt-8 '>
//           {user?._id == post?.userId && (
//             <div className='flex items-end justify-end space-x-2 bg-gray-50 p-1 rounded-lg'>
//               <p className='cursor-pointer' style={{ fontSize: '24px' }} onClick={() => navigate('/edit/' + postId)}>
//                 <BiEdit />
//               </p>
//               <p className='cursor-pointer ' onClick={handleDltPost} style={{ fontSize: '24px' }}>
//                 <MdDelete />
//               </p>
//             </div>
//           )}
//           <h1 className='text-2xl font-bold md:text-3xl md:mt-6 text-black'>{post.title}</h1>
//           <div className='flex items-center justify-between mt-2 md:mt-2 '>
//             <p>@{post.username}</p>
//             <div className='flex space-x-2'>
//               <p>{new Date(post.updatedAt).toString().slice(4, 15)}</p>
//               <p>-{new Date(post.updatedAt).toString().slice(15, 21)}</p>
//             </div>
//           </div>
//           <img src={import.meta.env.IMGFOLDER+post.photo} alt='' className='w-full mx-auto md:mt-2 mt-4 rounded-lg'/>
//           <p className='mx-auto mt-4 md:mt-4 '>{post.description}</p>
//           <div className='flex items-center mt-4 space-x-4 font-semibold'>
//             <p>Categories :</p>
//             <div className='flex justify-center items-center space-x-2'>
//               {post.categories?.map((c, i) => (
//                 <div key={i} className='bg-gray-300 rounded-lg px-3 py-1'>
//                   {c}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className='flex flex-col mt-2'>
//             <h3 className='mt-2  font-semibold'>Comments :</h3>
//             {comments?.map((c) => (
//               <Comment key={c._id} c={c} post={post} />
//             ))}
//           </div>
//           {/* write a comment */}
//           <div className='w-full flex flex-col mt-4 md:flex-row '>
//             <input
//               onChange={(e) => setComment(e.target.value)}
//               className='md:w-[80%] md:mt-0 outline-none px-4 mt-4  border border-gray-300 p-4 rounded-lg'
//               type='text'
//               placeholder='Write a comment...'/>
//             <button
//               onClick={postComment}
//               className='bg-black text-md font-semibold text-white rounded-lg md:w-[20%] mt-4 md:mt-0 px-4 py-2'>
//               Add
//             </button>
//           </div>
//         </div>
//       )}
//       <Footer />
//     </div>
//   );
// };

// export default PostDetails;

import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import Comment from '../components/Comment';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import Loader from '../components/Loader';

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/posts/` + postId);
      setPost(res.data);
      setLoader(false);
      console.log("image error undo nokkan", res.data)
    } catch (err) {
      console.error('Error fetching post:', err);
      setLoader(false);
    }
  };

  // post delete
  const handleDltPost = async () => {
    const confirmed = window.confirm("Do you want to delete your blog?")
    if (confirmed) {
      try {
        const res = await axios.delete(`${import.meta.env.VITE_URL}/api/posts/` + postId, {
          withCredentials: true,
        });
        console.log(res.data);
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Blog delete canceled.")
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/comments/post/` + postId);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/comments/create`,
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      console.log('comment posted', res.data);
      fetchPostComments(); // Refresh comments after posting
      setComment('');
      window.location.reload(true);

    } catch (err) {
      console.log('Error posting comment:', err);
    }
  };

  const imgSrc = `${import.meta.env.IMGFOLDER}${encodeURIComponent(post.photo)}`;
  console.log("Post:", post);
  console.log("IMGFOLDER:", import.meta.env.IMGFOLDER);
  console.log("Encoded Photo:", encodeURIComponent(post.photo));
  console.log("Image Source nokkan:", imgSrc);


  return (
    <div>
      <Navbar />
      {loader ? (
        <div className='h-[80vh] flex justify-center items-center'>
          <Loader />
        </div>
      ) : (
        <div className='px-8 md:px-[200px] mt-8 '>
          {user?._id == post?.userId && (
            <div className='flex items-end justify-end space-x-2 bg-gray-50 p-1 rounded-lg'>
              <p className='cursor-pointer' style={{ fontSize: '24px' }} onClick={() => navigate('/edit/' + postId)}>
                <BiEdit />
              </p>
              <p className='cursor-pointer ' onClick={handleDltPost} style={{ fontSize: '24px' }}>
                <MdDelete />
              </p>
            </div>
          )}
          <h1 className='text-2xl font-bold md:text-3xl md:mt-6 text-black'>{post.title}</h1>
          <div className='flex items-center justify-between mt-2 md:mt-2 '>
            <p>@{post.username}</p>
            <div className='flex space-x-2'>
              <p>{new Date(post.updatedAt).toString().slice(4, 15)}</p>
              <p>-{new Date(post.updatedAt).toString().slice(15, 21)}</p>
            </div>
          </div>
          <img src={imgSrc} alt='' className='w-full mx-auto md:mt-2 mt-4 rounded-lg' />
          {/* <img src={`${import.meta.env.IMGFOLDER}${post.photo}`} alt='' className='w-full mx-auto md:mt-2 mt-4 rounded-lg' /> */}
          <p className='mx-auto mt-4 md:mt-4 '>{post.description}</p>
          <div className='flex items-center mt-4 space-x-4 font-semibold'>
            <p>Categories :</p>
            <div className='flex justify-center items-center space-x-2'>
              {post.categories?.map((c, i) => (
                <div key={i} className='bg-gray-300 rounded-lg px-3 py-1'>
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col mt-2'>
            <h3 className='mt-2  font-semibold'>Comments :</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} />
            ))}
          </div>
          {/* write a comment */}
          <div className='w-full flex flex-col mt-4 md:flex-row '>
            <input
              onChange={(e) => setComment(e.target.value)}
              className='md:w-[80%] md:mt-0 outline-none px-4 mt-4  border border-gray-300 p-4 rounded-lg'
              type='text'
              placeholder='Write a comment...' />
            <button
              onClick={postComment}
              className='bg-black text-md font-semibold text-white rounded-lg md:w-[20%] mt-4 md:mt-0 px-4 py-2'>
              Add
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
