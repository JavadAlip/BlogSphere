// Pagination.js
import React from 'react';

const Pagination = ({ totalPosts, postPerPage, currentPage, onPageChange }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => onPageChange(page)}
          style={{
            background: currentPage === page ? 'black' : 'lightgray',
            color: currentPage === page ? 'white' : 'black',
            padding: '5px 10px',
            margin: '2px',
            cursor: 'pointer',
            borderRadius: '6px', 
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
