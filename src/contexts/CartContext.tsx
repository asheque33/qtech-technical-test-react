/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { IProduct } from '../types/product';
import type { ICartContext, ICartItem } from '../types/cart-context';

const CartContext = createContext<ICartContext | null>(null);
const CART_STORAGE_KEY = 'shopping-cart';

const getCartFromStorage = (): ICartItem[] => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>(() =>
    getCartFromStorage()
  );
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] =
    useState<boolean>(false);

  // save to local-storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Silently fail if storage unavailable
    }
  }, [cartItems]);
  const addToCart = (product: IProduct, quantity: number = 1): void => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      const maxStock = product.stockCount || 1;

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        const validQuantity = Math.min(newQuantity, maxStock);

        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: validQuantity } : item
        );
      }

      const validQuantity = Math.min(quantity, maxStock);
      return [...prevItems, { ...product, quantity: validQuantity }];
    });
  };

  const removeFromCart = (productId: string): void => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  const updateQuantity = (productId: string, newQuantity: number): void => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id === productId) {
          const maxStock = item.stockCount || 1;
          const validQuantity = Math.min(newQuantity, maxStock);
          return { ...item, quantity: validQuantity };
        }
        return item;
      })
    );
  };

  const hasAvailableStock = (item: ICartItem): boolean => {
    return item.quantity < (item.stockCount || 1);
  };

  const isAboveMinimumQuantity = (item: ICartItem): boolean => {
    return item.quantity > 1;
  };

  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const clearCart = (): void => {
    setCartItems([]);
  };

  const handleCheckout = (): void => {
    setIsCartOpen(false);
    setTimeout(() => {
      setIsCheckoutModalOpen(true);
    }, 150);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        handleCheckout,
        addToCart,
        removeFromCart,
        updateQuantity,
        hasAvailableStock,
        isAboveMinimumQuantity,
        getTotalItems,
        getTotalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): ICartContext => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
