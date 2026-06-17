const shiprocketEmail = process.env.SHIPROCKET_EMAIL || '';
const shiprocketPassword = process.env.SHIPROCKET_PASSWORD || '';

let shiprocketToken: string | null = null;
let tokenExpiry: number = 0;

async function getShiprocketToken() {
  if (!shiprocketEmail || !shiprocketPassword) {
    return 'mock_token';
  }

  // Token cache check
  if (shiprocketToken && Date.now() < tokenExpiry) {
    return shiprocketToken;
  }

  try {
    const res = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: shiprocketEmail, password: shiprocketPassword }),
    });
    
    if (res.ok) {
      const data = await res.json();
      shiprocketToken = data.token;
      tokenExpiry = Date.now() + 9 * 24 * 60 * 60 * 1000; // 9 days expiry
      return shiprocketToken;
    }
  } catch (error) {
    console.error('Shiprocket login error:', error);
  }
  return 'mock_token';
}

export async function calculateShippingRates({
  pickupPincode = '500001', // Store warehouse location
  deliveryPincode,
  weightInKG,
  subtotal,
}: {
  pickupPincode?: string;
  deliveryPincode: string;
  weightInKG: number;
  subtotal: number;
}) {
  const token = await getShiprocketToken();
  if (token === 'mock_token') {
    // Return mock shipping rate (e.g. free shipping above ₹999, else ₹60 flat rate)
    return {
      rate: subtotal >= 999 ? 0 : 60,
      carrier: 'SpeedyDelivery-Mock',
      eta: '3-5 Days',
    };
  }

  try {
    const res = await fetch(
      `https://apiv2.shiprocket.in/v1/external/courier/serviceability?pickup_postcode=${pickupPincode}&delivery_postcode=${deliveryPincode}&weight=${weightInKG}&cod=0`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      const couriers = data.data?.available_courier_companies || [];
      if (couriers.length > 0) {
        // Return cheapest service
        const cheapest = couriers.reduce((prev: any, current: any) =>
          parseFloat(prev.rate) < parseFloat(current.rate) ? prev : current
        );
        return {
          rate: parseFloat(cheapest.rate),
          carrier: cheapest.courier_name,
          eta: cheapest.etd || '3-5 Days',
        };
      }
    }
  } catch (error) {
    console.error('Shiprocket rates calculation failed:', error);
  }

  return {
    rate: 80,
    carrier: 'Standard Ground Shipping',
    eta: '5-7 Days',
  };
}

export async function createShiprocketOrder({
  orderId,
  customerName,
  address,
  phone,
  pincode,
  city,
  state,
  items,
  total,
}: {
  orderId: string;
  customerName: string;
  address: string;
  phone: string;
  pincode: string;
  city: string;
  state: string;
  items: Array<{ name: string; quantity: number; sku: string; price: number }>;
  total: number;
}) {
  const token = await getShiprocketToken();
  if (token === 'mock_token') {
    return {
      shipmentId: `mock_shipment_${Math.random().toString(36).substring(7)}`,
      trackingNumber: `TRK-MOCK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      success: true,
    };
  }

  try {
    const res = await fetch('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        order_id: orderId,
        order_date: new Date().toISOString().split('T')[0],
        pickup_location: 'PrimaryWarehouse',
        billing_customer_name: customerName.split(' ')[0],
        billing_last_name: customerName.split(' ').slice(1).join(' ') || 'Customer',
        billing_address: address,
        billing_city: city,
        billing_pincode: pincode,
        billing_state: state,
        billing_country: 'India',
        billing_email: 'customer@gmail.com', // fallback
        billing_phone: phone,
        shipping_is_billing: true,
        order_items: items.map((item) => ({
          name: item.name,
          sku: item.sku,
          units: item.quantity,
          selling_price: item.price,
        })),
        payment_method: 'Prepaid',
        sub_total: total,
        length: 10,
        breadth: 10,
        height: 10,
        weight: 0.5,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        shipmentId: data.shipment_id,
        trackingNumber: data.awb_code || `TRK-SR-${data.order_id}`,
        success: true,
      };
    }
  } catch (error) {
    console.error('Shiprocket order creation failed:', error);
  }

  return {
    shipmentId: null,
    trackingNumber: null,
    success: false,
  };
}
