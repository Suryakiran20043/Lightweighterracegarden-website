import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../lib/store/cart';

describe('useCartStore unit tests', () => {
  beforeEach(() => {
    // Reset state before each test
    useCartStore.getState().clearCart();
  });

  it('should add items to the cart', () => {
    const { addItem, items } = useCartStore.getState();
    expect(items).toHaveLength(0);

    addItem({
      id: 'var_seeds_1',
      productId: 'prod_seeds_1',
      name: 'Premium Cherry Tomato Seeds',
      price: 99,
      sku: 'SEED-TOM-CHY',
    }, 2);

    const updatedItems = useCartStore.getState().items;
    expect(updatedItems).toHaveLength(1);
    expect(updatedItems[0].quantity).toBe(2);
    expect(updatedItems[0].price).toBe(99);
  });

  it('should calculate subtotal and total billing correctly', () => {
    const { addItem, getSubtotal, getTotal } = useCartStore.getState();

    // Adding items total ₹99 * 2 = ₹198
    addItem({
      id: 'var_seeds_1',
      productId: 'prod_seeds_1',
      name: 'Premium Cherry Tomato Seeds',
      price: 99,
      sku: 'SEED-TOM-CHY',
    }, 2);

    expect(getSubtotal()).toBe(198);
    // Shipping cost applies since subtotal is less than ₹999
    // subtotal (198) + shipping (60) = 258
    expect(getTotal()).toBe(258);
  });

  it('should apply coupons discount correctly', () => {
    const { addItem, applyCoupon, getTotal, getSubtotal } = useCartStore.getState();

    // Add high value item ₹1000 (qualifies for free shipping)
    addItem({
      id: 'var_soil_1',
      productId: 'prod_soil_1',
      name: 'Bulk lightweight mix',
      price: 1000,
      sku: 'SOIL-BULK',
    }, 1);

    expect(getSubtotal()).toBe(1000);

    // Apply 10% coupon (₹100 discount)
    applyCoupon('GROW10', 10, true);

    // subtotal (1000) - discount (100) + shipping (0) = 900
    expect(getTotal()).toBe(900);
  });
});
