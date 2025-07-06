import { useState } from 'react';
import { X } from 'lucide-react';
import type { ICheckoutFormData } from '../types/checkout-modal';
import { toast } from 'sonner';
import type { ICartItem } from '../types/cart-context';
import { useCart } from '../contexts/CartContext';

const CheckoutModal = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cartItems,
    getTotalPrice,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState<ICheckoutFormData>({
    name: '',
    email: '',
    address: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (): void => {
    if (!formData.name || !formData.email || !formData.address) {
      toast.warning('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.warning('Please enter a valid email address');
      return;
    }

    toast.success('Order Successfully Placed! 🎉', {
      description: `Hi ${
        formData.name
      }, your order of ৳${getTotalPrice().toLocaleString()} has been confirmed. Check your email for details.`,
      duration: 4000,
    });

    // Reset form, clear cart, and close modal
    setFormData({ name: '', email: '', address: '' });
    clearCart();
    setIsCheckoutModalOpen(false);
  };

  if (!isCheckoutModalOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-bold'>Checkout</h2>
          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        {/* Order Summary */}
        <div className='mb-6'>
          <h3 className='font-semibold mb-3'>Order Summary</h3>
          <div className='space-y-2 max-h-32 overflow-y-auto'>
            {cartItems.map((item: ICartItem) => (
              <div key={item._id} className='flex justify-between text-sm'>
                <span className='truncate mr-2'>
                  {item.title} x{item.quantity}
                </span>
                <span>৳{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className='border-t pt-2 mt-2'>
            <div className='flex justify-between font-semibold'>
              <span>Total:</span>
              <span>৳{getTotalPrice().toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Full Name *
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your full name'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email Address *
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your email address'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Delivery Address *
            </label>
            <textarea
              name='address'
              value={formData.address}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              rows={3}
              placeholder='Enter your complete delivery address'
            />
          </div>

          {/* Action Buttons */}
          <div className='flex space-x-3 pt-4'>
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
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
