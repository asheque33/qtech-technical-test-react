import { useCart } from '../contexts/CartContext';
import CartSidebar from './CartSidebar';

const CartIntegration = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCart();

  return (
    <CartSidebar
      isOpen={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      cartItems={cartItems}
      updateQuantity={updateQuantity}
      removeItem={removeFromCart}
      totalAmount={getTotalPrice()}
    />
  );
};
export default CartIntegration;
