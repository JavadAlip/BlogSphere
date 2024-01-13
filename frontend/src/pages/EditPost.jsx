import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ImCross } from 'react-icons/im';
import { URL } from '../url';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
const EditPost = () => {
    const [cat, setCat] = useState('');
    const [cats, setCats] = useState([]);
    const [title, setTitle] = useState("")
    const [description, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const postId = useParams().id
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const fetchPost = async () => {
        try {
            const res = await axios.get(URL + "/api/posts/" + postId)
            setTitle(res.data.title)
            setDesc(res.data.description)
            setFile(res.data.photo)
            setCats(res.data.categories)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchPost()
    }, [postId])

    // edit or update post
    const handleUpdate = async (e) => {
        e.preventDefault()

        // regex edit / update blog
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
            categories: cats
        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("img", filename)
            data.append("file", file)
            post.photo = filename

            // upload img
            try {
                const imgUpload = await axios.post(URL + "/api/upload", data)
                console.log(imgUpload.data);
            } catch (err) {
                console.log(err);
            }
        }

        // upload post
        try {
            const res = await axios.put(URL + "/api/posts/" + postId, post, { withCredentials: true })
            navigate("/posts/post/" + res.data._id)
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }
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
                <h1 className='font-bold mt-8 md:text-2xl text-xl '>Edit blog:</h1>
                <form action='' className='w-full flex mt-4 flex-col space-y-4 md:space-y-8'>
                    <input onChange={(e) => setTitle(e.target.value)} value={title} className='px-4 py-2 outline-none' placeholder='Blog title' type='text' />
                    <input onChange={(e) => setFile(e.target.files[0])} className='px-4 ' type='file' />
                    <div className='flex flex-col '>
                        <div className='flex items-center space-x-4 md:space-x-8 '>
                            <input
                                value={cat}
                                onChange={(e) => setCat(e.target.value)}
                                type='text'
                                placeholder='Blog category' // Fix placeholder syntax
                                className='px-4 py-2 outline-none' />
                            <div onClick={addCategory}
                                className='bg-black rounded-lg text-white px-4 py-2 font-semibold cursor-pointer '>
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
                    <textarea onChange={(e) => setDesc(e.target.value)} value={description} rows={15} cols={30} placeholder='Blog description' className='px-4 py-2 outline-none  bg-gray-100 rounded-lg' />
                     {/* Display error message */}
                     {error && <p className='text-red-500'>{error}</p>}
                    <button onClick={handleUpdate} className='bg-black rounded-lg w-full mdLw-[20%] px-4 py-2 md:text-xl text-lg mx-auto text-white font-semibold '>Update</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default EditPost