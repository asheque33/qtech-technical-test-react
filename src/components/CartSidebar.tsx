import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import type { ICartItem } from '../types/cart-context';

const CartSidebar = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    handleCheckout,
    hasAvailableStock,
    isAboveMinimumQuantity,
  } = useCart();

  if (!isCartOpen) return null;

  const onClose = () => setIsCartOpen(false);
  const totalAmount = getTotalPrice();

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
              {cartItems.map((item: ICartItem) => (
                <div
                  key={item._id}
                  className='flex items-center space-x-4 border-b pb-4'
                >
                  <img
                    src={item.images?.[0] || '/placeholder.jpg'}
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

                    <p className='text-xs text-gray-500 mt-1'>
                      Stock: {item.stockCount || 0} available
                    </p>

                    {/*  Simple quantity controls, logic in context */}
                    <div className='flex items-center mt-2'>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        className={`p-1 rounded transition-colors ${
                          !isAboveMinimumQuantity(item)
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                        disabled={!isAboveMinimumQuantity(item)}
                        title={
                          !isAboveMinimumQuantity(item)
                            ? 'Minimum quantity is 1'
                            : 'Decrease quantity'
                        }
                      >
                        <Minus className='w-4 h-4' />
                      </button>

                      <span className='px-3 py-1 border border-gray-300 rounded text-sm mx-2 bg-gray-50'>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        className={`p-1 rounded transition-colors ${
                          !hasAvailableStock(item)
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                        disabled={!hasAvailableStock(item)}
                        title={
                          !hasAvailableStock(item)
                            ? `Maximum stock: ${item.stockCount || 1}`
                            : 'Increase quantity'
                        }
                      >
                        <Plus className='w-4 h-4' />
                      </button>
                    </div>

                    {!hasAvailableStock(item) && (
                      <p className='text-xs text-amber-600 mt-1'>
                        ⚠️ Maximum stock reached
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className='p-2 text-red-500 hover:bg-red-50 rounded transition-colors'
                    title='Remove from cart'
                  >
                    <X className='w-4 h-4' />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className='border-t p-4 space-y-4'>
              <div className='flex justify-between text-sm text-gray-600'>
                <span>Total Items:</span>
                <span>
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>

              <div className='flex justify-between items-center text-lg font-semibold'>
                <span>Total:</span>
                <span>৳{totalAmount.toLocaleString()}</span>
              </div>

              <button
                onClick={handleCheckout}
                className='w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium'
              >
                Checkout ({cartItems.length}{' '}
                {cartItems.length === 1 ? 'item' : 'items'})
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
