// import React, { useState, useEffect } from 'react';

// const HomePost = ({ post }) => {
//   const [descriptionLimit, setDescriptionLimit] = useState(200);
//   const [titleLimit, setTitleLimit] = useState(80)
//   useEffect(() => {
//     const handleResize = () => {
//       setDescriptionLimit(window.innerWidth <= 768 ? 70 : 200);
//       setTitleLimit(window.innerWidth <= 768 ? 80 : 80)
//     };


//     // Initial setup
//     handleResize();
//     // Listen for window resize events
//     window.addEventListener('resize', handleResize);
//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div className='w-full flex mt-8 space-x-4 '>
//       {/* left */}
//       <div className='w-[35%] h-[200px] flex justify-center items-center'>
//         <img src={import.meta.env.VITE_IMGFOLDER + post.photo} alt="" className='h-full w-full rounded-lg object-cover' />
//       </div>
//       {/* right */}
//       <div className='flex-col flex w-[65%]'>
//         <h1 className="text-xl font-bold md:mb-1 mb-1 md:text-2xl">
//           {post.title.slice(0, titleLimit)}
//         </h1>
//         <div className='flex mb-2 text-sm items-center justify-between text-gray-500 space-x-4 md:mb-4'>
//           <p>@{post.username}</p>
//           <div className='flex space-x-2'>
//             <p>{new Date(post.updatedAt).toString().slice(4, 15)}</p>
//             <p>-{new Date(post.updatedAt).toString().slice(15, 21)}</p>
//           </div>
//         </div>
//         <p className='text-sm md:text-lg'>
//           {post.description.slice(0, descriptionLimit)} <span style={{ color: 'grey', fontSize: 'medium' }}> Read more...</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default HomePost;

import React, { useState, useEffect } from 'react';
import { VITE_IMGFOLDER } from '../url';


const HomePost = ({ post }) => {
  const [descriptionLimit, setDescriptionLimit] = useState(200);
  const [titleLimit, setTitleLimit] = useState(80);

  useEffect(() => {
    const handleResize = () => {
      setDescriptionLimit(window.innerWidth <= 768 ? 70 : 200);
      setTitleLimit(window.innerWidth <= 768 ? 80 : 80);
    };

    // Initial setup
    handleResize();
    // Listen for window resize events
    window.addEventListener('resize', handleResize);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Encode the image filename
  // const encodedPhoto = encodeURIComponent(post.photo);
  // const imgSrc = `${import.meta.env.VITE_IMGFOLDER}${encodedPhoto}`;

  // useEffect(() => {
  //   // Log image source for debugging
  //   console.log("Image Source:", imgSrc);
  // }, [imgSrc]);

  return (
    <div className='w-full flex mt-8 space-x-4 '>
      {/* left */}
      <div className='w-[35%] h-[200px] flex justify-center items-center'>
        <img src={VITE_IMGFOLDER + post.photo} alt="" className='h-full w-full rounded-lg object-cover' />
      </div>
      {/* right */}
      <div className='flex-col flex w-[65%]'>
        <h1 className="text-xl font-bold md:mb-1 mb-1 md:text-2xl">
          {post.title.slice(0, titleLimit)}
        </h1>
        <div className='flex mb-2 text-sm items-center justify-between text-gray-500 space-x-4 md:mb-4'>
          <p>@{post.username}</p>
          <div className='flex space-x-2'>
            <p>{new Date(post.updatedAt).toString().slice(4, 15)}</p>
            <p>-{new Date(post.updatedAt).toString().slice(15, 21)}</p>
          </div>
        </div>
        <p className='text-sm md:text-lg'>
          {post.description.slice(0, descriptionLimit)} <span style={{ color: 'grey', fontSize: 'medium' }}> Read more...</span>
        </p>
      </div>
    </div>
  );
};

export default HomePost;
