import React, { useContext } from 'react';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { URL } from '../url';
import { UserContext } from '../context/UserContext';

const Comment = ({ c, post }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async () => {
    try {
      const res = await axios.delete(`${URL}/api/comments/${c._id}`, { withCredentials: true });
      console.log("Comment deleted", res);
      // Add any additional logic after deleting the comment
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='px-2 py-2 bg-gray-200 rounded-lg my-2'>
      <div className='flex items-center justify-between'>
        <h3 className='font-bold text-gray-600'>@{c.author}</h3>
        <div className='flex justify-center items-center text-sm space-x-3'>
          <p>{new Date(c.updatedAt).toString().slice(4, 15)}</p>
          <p>-{new Date(c.updatedAt).toString().slice(15, 21)}</p>
          {(user?._id === c?.userId || !user) && (
            <div className='flex justify-center items-center space-x-1'>
              <p onClick={deleteComment} className='cursor-pointer'><MdDelete /></p>
            </div>
          )}
        </div>
      </div>
      <p className='px-4 mt-2'>{c.comment}</p>
    </div>
  );
};

export default Comment;
