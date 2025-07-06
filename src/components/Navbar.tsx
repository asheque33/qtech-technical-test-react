import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { getTotalItems, setIsCartOpen } = useCart();

  return (
    <nav className='bg-white shadow-lg sticky top-0 z-40'>
      <div className='w-full max-w-6xl mx-auto px-4 md:px-6'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <span className='text-2xl font-bold text-blue-600'>ShopEasy</span>

          {/* Navigation Links */}
          <div className='flex items-center space-x-8'>
            <Link
              to='/'
              className='text-lg font-semibold px-3 py-2 text-gray-700 hover:text-blue-600'
            >
              Home
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
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
