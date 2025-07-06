// components/CartSidebar.js
import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import CheckoutModal from '../pages/CheckoutModal';

const CartSidebar = ({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeItem,
  totalAmount,
}) => {
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setShowCheckout(true);
    onClose(); // ✅ Cart sidebar close করুন
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black bg-opacity-50 z-50'
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className='fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b'>
          <h2 className='text-lg font-semibold'>Shopping Cart</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Cart Content */}
        {cartItems.length === 0 ? (
          // Empty Cart
          <div className='flex flex-col items-center justify-center h-96'>
            <ShoppingCart className='w-16 h-16 text-gray-400 mb-4' />
            <p className='text-gray-500'>Your cart is empty</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className='flex-1 p-4 space-y-4'>
              {cartItems.map((item) => (
                <div
                  key={item._id} // ✅ _id ব্যবহার করুন
                  className='flex items-center space-x-4 border-b pb-4'
                >
                  <img
                    src={item.images?.[0] || item.image} // ✅ images array handle
                    alt={item.title}
                    className='w-16 h-16 object-cover rounded'
                  />
                  <div className='flex-1'>
                    <h3 className='font-medium text-gray-900 text-sm'>
                      {item.title}
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      ৳{item.price.toLocaleString()}
                    </p>

                    {/* Quantity Controls */}
                    <div className='flex items-center mt-2'>
                      <button
                        onClick={
                          () => updateQuantity(item._id, item.quantity - 1) // ✅ _id
                        }
                        className='p-1 hover:bg-gray-100 rounded'
                      >
                        <Minus className='w-4 h-4' />
                      </button>
                      <span className='px-3 py-1 border border-gray-300 rounded text-sm mx-2'>
                        {item.quantity}
                      </span>
                      <button
                        onClick={
                          () => updateQuantity(item._id, item.quantity + 1) // ✅ _id
                        }
                        className='p-1 hover:bg-gray-100 rounded'
                      >
                        <Plus className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item._id)} // ✅ _id
                    className='p-2 text-red-500 hover:bg-red-50 rounded'
                  >
                    <X className='w-4 h-4' />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className='border-t p-4 space-y-4'>
              <div className='flex justify-between items-center text-lg font-semibold'>
                <span>Total:</span>
                <span>৳{totalAmount.toLocaleString()}</span>
              </div>
              <button
                onClick={handleCheckout} // ✅ Function call করুন
                className='w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700'
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          cartItems={cartItems}
          totalAmount={totalAmount}
        />
      )}
    </>
  );
};

export default CartSidebar;
