// components/CheckoutModal.js
import React, { useState } from 'react';
import { X } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, cartItems, totalAmount }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.address) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate order placement
    alert('Order placed successfully! Thank you for your purchase.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg max-w-md w-full'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b'>
          <h2 className='text-xl font-semibold'>Checkout</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        <div className='p-6 space-y-4'>
          {/* Order Summary */}
          <div className='space-y-4'>
            <h3 className='font-medium text-gray-900'>Order Summary</h3>
            <div className='bg-gray-50 p-4 rounded-md space-y-2'>
              {cartItems.map((item) => (
                <div key={item.id} className='flex justify-between text-sm'>
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>৳{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className='border-t pt-2 flex justify-between font-semibold'>
                <span>Total:</span>
                <span>৳{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Name
              </label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                placeholder='Enter your name'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                placeholder='Enter your email'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Address
              </label>
              <textarea
                name='address'
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                placeholder='Enter your address'
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-4 pt-4'>
            <button
              onClick={onClose}
              className='flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200'
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className='flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
