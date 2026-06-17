import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'mock_stripe_key';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-01-27-accredited' as any, // latest stable API version or dynamic fallback
});

export async function createStripeCheckoutSession({
  orderId,
  items,
  customerEmail,
  totalAmount,
}: {
  orderId: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  customerEmail: string;
  totalAmount: number;
}) {
  if (stripeSecretKey === 'mock_stripe_key') {
    console.warn('Stripe: Running in MOCK mode.');
    return {
      id: `mock_session_${Math.random().toString(36).substring(7)}`,
      url: `/checkout/success?orderId=${orderId}&gateway=stripe`,
    };
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    customer_email: customerEmail,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?orderId=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    metadata: {
      orderId,
    },
  });

  return {
    id: session.id,
    url: session.url,
  };
}
