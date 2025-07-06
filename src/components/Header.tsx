import React from 'react';

const Header = () => {
  return (
    <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='text-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            Welcome to ShopEasy
          </h1>
          <p className='text-xl mb-8'>
            Discover amazing products at great prices
          </p>
          <button className='bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors'>
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
