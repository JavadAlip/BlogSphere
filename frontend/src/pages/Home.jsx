import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import HomePost from '../components/HomePost';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { UserContext } from '../context/UserContext';
import { URL } from '../url';
import Pagination from '../components/Pagination';

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (err) {
      console.error(err);
      setNoResults(false);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = posts.slice(firstPostIndex, lastPostIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />
      <div className='px-8 md:px-[200px] min-h-[80vh]'>
        {loader ? (
          <div className='h-[40vh] flex justify-center items-center'>
            <Loader />
          </div>
        ) : !noResults ? (
          currentPost.map((post) => (
            <Link to={user ? `/posts/post/${post._id}` : '/login'} key={post._id}>
              <HomePost post={post} />
            </Link>
          ))
        ) : (
          <h3 className='text-center font-bold mt-16'>No blogs available!</h3>
        )}
        <Pagination
          totalPosts={posts.length}
          postPerPage={postPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      <Footer />
    </>
  );
};

export default Home;

