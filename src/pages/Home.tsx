import React from 'react';
import Header from '../components/Header';
import Products from '../components/Products';

const HomePage = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <Products />
    </div>
  );
};

export default HomePage;
