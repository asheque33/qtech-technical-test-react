import type { ICartItem } from "./cart-context";

export interface ICartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: ICartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeItem: (productId: string) => void;
  totalAmount: number;
  onCheckout: () => void;
}