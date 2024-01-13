import React from 'react';
const Footer = () => {
  return (
    <div className='mt-8 w-full bg-black px-8 md:px-[500px] flex flex-col md:flex-row justify-between items-center text-sm md:text-md py-4'>
      <div className='text-[10px] leading-7 text-white text-center'>
        <p className=' text-center text-white md:text-left'>Copyright ©<a href="https://github.com/JavadAlip" target="_blank" rel="noopener noreferrer"> BlogSphere</a> 2023. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
