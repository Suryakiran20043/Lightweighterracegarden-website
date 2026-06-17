import Razorpay from 'razorpay';

const razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'mock_razorpay_id';
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'mock_razorpay_secret';

let razorpay: Razorpay | null = null;
if (razorpayKeyId !== 'mock_razorpay_id') {
  razorpay = new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
  });
}

export async function createRazorpayOrder({
  orderId,
  amountInINR,
}: {
  orderId: string;
  amountInINR: number;
}) {
  if (!razorpay) {
    console.warn('Razorpay: Running in MOCK mode.');
    return {
      id: `mock_order_${Math.random().toString(36).substring(7)}`,
      amount: amountInINR * 100,
      currency: 'INR',
      receipt: orderId,
      mock: true,
    };
  }

  const order = await razorpay.orders.create({
    amount: Math.round(amountInINR * 100), // amount in paise
    currency: 'INR',
    receipt: orderId,
    payment_capture: true,
  });

  return {
    id: order.id,
    amount: order.amount,
    currency: order.currency,
    receipt: order.receipt,
    mock: false,
  };
}

export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  if (!razorpay) {
    return true; // Mock validation
  }

  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', razorpayKeySecret);
  hmac.update(orderId + '|' + paymentId);
  const generatedSignature = hmac.digest('hex');

  return generatedSignature === signature;
}
