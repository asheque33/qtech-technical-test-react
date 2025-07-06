// components/ProductCard.js
import { ShoppingCart } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅ Cart function নিয়ে আসুন

  // ✅ Add to Cart functionality
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Card click prevent করুন
    addToCart(product, 1); // Product add করুন cart এ
  };

  const handleProductClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div
      onClick={handleProductClick}
      className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer'
    >
      {/* Product Image */}
      <div className='relative overflow-hidden'>
        <img
          src={product.images?.[0] || product.image || '/placeholder.jpg'}
          alt={product.title}
          className='w-full h-48 object-cover hover:scale-105 transition-transform duration-300'
        />
      </div>

      {/* Product Info */}
      <div className='p-4'>
        {/* Title with Fixed Height */}
        <div className='h-12 mb-2'>
          <h3 className='text-lg font-semibold text-gray-800 line-clamp-2 leading-tight'>
            {product.title}
          </h3>
        </div>

        <div className='flex items-center justify-between mb-4'>
          <span className='text-xl font-bold text-gray-900'>
            ৳{product.price.toLocaleString()}
          </span>
        </div>

        {/* ✅ Working Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center'
        >
          <ShoppingCart className='w-4 h-4 mr-2' />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
