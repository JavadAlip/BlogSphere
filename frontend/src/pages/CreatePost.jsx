import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ImCross } from 'react-icons/im';

const CreatePost = () => {
    const [cat, setCat] = useState('');
    const [cats, setCats] = useState([]);

    const deleteCategory = (i) => {
        let updateCats = [...cats];
        updateCats.splice(i, 1); // Provide both arguments to splice
        setCats(updateCats);
    };

    const addCategory = () => {
        let updateCats = [...cats];
        updateCats.push(cat);
        setCat('');
        setCats(updateCats);
    };

    return (
        <div>
            <Navbar />
            <div className='px-6 md:px-[200px] mt-8'>
                <h1 className='font-bold mt-8 md:text-2xl text-xl '>Create a post</h1>
                <form action='' className='w-full flex mt-4 flex-col space-y-4 md:space-y-8'>
                    <input className='px-4 py-2 outline-none' placeholder='Enter post title' type='text' />
                    <input className='px-4 ' type='file' />
                    <div className='flex flex-col '>
                        <div className='flex items-center space-x-4 md:space-x-8 '>
                            <input
                                value={cat}
                                onChange={(e) => setCat(e.target.value)}
                                type='text'
                                placeholder='Enter post category' // Fix placeholder syntax
                                className='px-4 py-2 outline-none'
                            />
                            <div
                                onClick={addCategory}
                                className='bg-black rounded-lg text-white px-4 py-2 font-semibold cursor-pointer '
                            >
                                Add
                            </div>
                        </div>
                        {/* category */}
                        <div className='flex px-4 mt-3'>
                            {cats.map((c, i) => (
                                <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                                    <p>{c}</p>
                                    <p onClick={() => deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross /></p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <textarea rows={15} cols={30} placeholder='Enter post description' className='px-4 py-2 outline-none' />
                    <button className='bg-black w-full mdLw-[20%] rounded-lg px-4 py-2 md:text-xl text-lg mx-auto text-white font-semibold '>Create</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default CreatePost;
