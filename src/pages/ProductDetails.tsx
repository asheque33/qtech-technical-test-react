import {
  ShoppingCart,
  ArrowLeft,
  Star,
  Heart,
  Share2,
  Plus,
  Minus,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductDetails = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Add to Cart button এর জন্য এই function যোগ করুন:
  const handleAddToCart = () => {
    addToCart(product, quantity); // Selected quantity সহ add করুন
  };
  // ✅ Proper state management
  const [product, setProduct] = useState(null); // null instead of array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching product with ID:', _id);

        const response = await fetch(`http://localhost:4000/products/${_id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API Response:', result);

        if (result.success && result.data) {
          setProduct(result.data);
        } else {
          throw new Error(result.message || 'Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (_id) {
      getProduct();
    }
  }, [_id]);

  // ✅ Loading state
  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading product details...</p>
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (error || !product) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            {error || 'Product not found'}
          </h2>
          <p className='text-gray-600 mb-6'>ID: {_id}</p>
          <button
            onClick={() => navigate('/')}
            className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700'
          >
            <ArrowLeft className='w-4 h-4 inline mr-2' />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity((prev) => Math.min(prev + 1, product.stockCount || 1));
    } else {
      setQuantity((prev) => Math.max(prev - 1, 1));
    }
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Breadcrumb */}
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex items-center space-x-2 text-sm text-gray-500'>
            <button
              onClick={() => navigate('/')}
              className='flex items-center text-blue-600 hover:text-blue-800'
            >
              <ArrowLeft className='w-4 h-4 mr-1' />
              Back
            </button>
            <span>/</span>
            <span>{product.category || 'Product'}</span>
            <span>/</span>
            <span className='text-gray-900'>{product.title || 'Details'}</span>
          </div>
        </div>
      </div>

      {/* Product Detail Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Product Images */}
          <div className='space-y-4'>
            {/* Main Image */}
            <div className='aspect-square overflow-hidden rounded-lg bg-gray-100'>
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center text-gray-400'>
                  No Image Available
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className='flex space-x-2'>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? 'border-blue-600'
                        : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className='w-full h-full object-cover'
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className='space-y-6'>
            {/* Product Title & Rating */}
            <div>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm text-gray-500'>
                  {product.brand || 'Unknown Brand'}
                </span>
                <button className='p-2 hover:bg-gray-100 rounded-full'>
                  <Share2 className='w-5 h-5' />
                </button>
              </div>

              <h1 className='text-3xl font-bold text-gray-900 mb-3'>
                {product.title || 'Product Title'}
              </h1>

              <div className='flex items-center space-x-4 mb-4'>
                <div className='flex items-center space-x-1'>
                  {renderStars(product.rating)}
                  <span className='text-sm text-gray-600 ml-1'>
                    {product.rating || 0} ({product.reviewCount || 0} reviews)
                  </span>
                </div>
                <span className='text-sm text-gray-500'>
                  SKU: {product.sku || 'N/A'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className='border-t border-b py-6'>
              <div className='flex items-center space-x-4'>
                <span className='text-4xl font-bold text-gray-900'>
                  ৳{product.price?.toLocaleString() || '0'}
                </span>
                {product.originalPrice && (
                  <>
                    <span className='text-2xl text-gray-500 line-through'>
                      ৳{product.originalPrice.toLocaleString()}
                    </span>
                    <span className='bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium'>
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              <div className='mt-2'>
                {product.inStock ? (
                  <span className='text-green-600 font-medium'>
                    ✓ In Stock ({product.stockCount || 0} available)
                  </span>
                ) : (
                  <span className='text-red-600 font-medium'>
                    ✗ Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <label className='text-sm font-medium text-gray-700'>
                  Quantity:
                </label>
                <div className='flex items-center border border-gray-300 rounded-md'>
                  <button
                    onClick={() => handleQuantityChange('decrease')}
                    className='p-2 hover:bg-gray-100 disabled:opacity-50'
                    disabled={quantity <= 1}
                  >
                    <Minus className='w-4 h-4' />
                  </button>
                  <span className='px-4 py-2 border-x border-gray-300 min-w-[60px] text-center'>
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange('increase')}
                    className='p-2 hover:bg-gray-100 disabled:opacity-50'
                    disabled={quantity >= (product.stockCount || 1)}
                  >
                    <Plus className='w-4 h-4' />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex space-x-4'>
                <button
                  onClick={handleAddToCart} // ✅ Function call করুন
                  className='flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center font-medium disabled:opacity-50'
                  disabled={!product.inStock}
                >
                  <ShoppingCart className='w-5 h-5 mr-2' />
                  Add to Cart
                </button>

                <button className='p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors'>
                  <Heart className='w-5 h-5' />
                </button>
              </div>
            </div>

            {/* Product Description */}
            <div className='border-t pt-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                Description
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                {product.description || 'No description available.'}
              </p>
            </div>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                  Key Features
                </h3>
                <ul className='space-y-2'>
                  {product.features.map((feature, index) => (
                    <li key={index} className='flex items-start text-gray-600'>
                      <span className='text-green-500 mr-2'>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Specifications Table */}
        {product.specifications &&
          Object.keys(product.specifications).length > 0 && (
            <div className='mt-12 bg-white rounded-lg shadow-md overflow-hidden'>
              <div className='px-6 py-4 border-b'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  Specifications
                </h3>
              </div>
              <div className='px-6 py-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className='flex justify-between py-2 border-b border-gray-100'
                      >
                        <span className='font-medium text-gray-700'>
                          {key}:
                        </span>
                        <span className='text-gray-600'>{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProductDetails;
