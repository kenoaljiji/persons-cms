import React from 'react';
import './loader.scss';

const LoaderPage = () => {
  return (
    <div class='text-center loader-container'>
      <img
        className='loader-image'
        src='/assets/images/wiki.png'
        alt='Wiki'
        width='45px'
        height='auto'
      />
    </div>
  );
};

export default LoaderPage;
