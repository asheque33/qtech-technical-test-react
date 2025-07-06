import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import type { IProduct } from '../types/product';

const ProductCard = ({ product }: { product: IProduct }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  //  Add to Cart functionality
  const handleAddToCart = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleProductClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div
      onClick={handleProductClick}
      className='w-[200px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex-shrink-0'
      style={{ width: '200px' }}
    >
      {/* Product Image */}
      <div className='relative overflow-hidden'>
        <img
          src={product.images?.[0] || '/placeholder.jpg'}
          alt={product.title}
          className='w-full h-48 object-cover hover:scale-105 transition-transform duration-300'
        />
      </div>

      {/* Product Info */}
      <div className='p-4'>
        {/* Title with Fixed Height */}
        <div className='h-10 mb-2'>
          <h3 className='text-base font-medium text-gray-800 line-clamp-2 leading-tight'>
            {product.title}
          </h3>
        </div>

        <div className='flex items-center justify-between mb-2'>
          <span className='text-lg font-medium text-gray-900'>
            ৳{product.price.toLocaleString()}
          </span>
        </div>

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
