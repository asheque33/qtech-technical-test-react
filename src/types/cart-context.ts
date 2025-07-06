import type { ReactNode } from "react";
import type { IProduct } from "./product";

export interface ICartItem extends IProduct {
  quantity: number;
}
export interface ICartContext {
  cartItems: ICartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (isOpen: boolean) => void;
  handleCheckout: () => void;
  addToCart: (product: IProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
  hasAvailableStock: (item: ICartItem) => boolean;
  isAboveMinimumQuantity: (item: ICartItem) => boolean;
}

export interface ICartProviderProps {
  children: ReactNode;
}