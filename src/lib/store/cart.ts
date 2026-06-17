import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // ProductVariant id
  productId: string;
  name: string; // e.g. "Vegetable Starter Kit (5 kg)"
  image?: string;
  price: number;
  quantity: number;
  sku: string;
}

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  discountAmount: number;
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  applyCoupon: (code: string, discountValue: number, isPercentage: boolean) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discountAmount: 0,
      addItem: (item, qty = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
            ),
          });
        } else {
          set({ items: [...currentItems, { ...item, quantity: qty }] });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },
      updateQuantity: (id, qty) => {
        if (qty <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
        });
      },
      applyCoupon: (code, discountValue, isPercentage) => {
        const subtotal = get().getSubtotal();
        let discount = 0;
        if (isPercentage) {
          discount = (subtotal * discountValue) / 100;
        } else {
          discount = discountValue;
        }
        set({ couponCode: code, discountAmount: Math.min(discount, subtotal) });
      },
      removeCoupon: () => {
        set({ couponCode: null, discountAmount: 0 });
      },
      clearCart: () => {
        set({ items: [], couponCode: null, discountAmount: 0 });
      },
      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().discountAmount;
        // Shipping is ₹60 flat if under ₹999, else free
        const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 60;
        return Math.max(0, subtotal - discount + shipping);
      },
    }),
    {
      name: 'terrace-garden-cart',
    }
  )
);
