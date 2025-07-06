// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Home } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { getTotalItems, setIsCartOpen } = useCart(); // ✅ Cart functions

  return (
    <nav className='bg-white shadow-lg sticky top-0 z-40'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link to='/' className='text-2xl font-bold text-blue-600'>
            ShopEasy
          </Link>

          {/* Navigation Links */}
          <div className='flex items-center space-x-8'>
            <Link
              to='/'
              className='flex items-center px-3 py-2 text-gray-700 hover:text-blue-600'
            >
              <Home className='w-4 h-4 mr-2' />
              Home
            </Link>

            {/* ✅ Cart Icon with Badge */}
            <button
              onClick={() => setIsCartOpen(true)} // ✅ Cart sidebar খুলুন
              className='relative p-2 text-gray-700 hover:text-blue-600'
            >
              <ShoppingCart className='w-6 h-6' />

              {/* ✅ Cart Items Count Badge */}
              {getTotalItems() > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
