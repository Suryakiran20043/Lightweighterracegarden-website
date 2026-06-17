import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || 'mock_resend_key';

export const resend = resendApiKey !== 'mock_resend_key' ? new Resend(resendApiKey) : null;

export async function sendOrderConfirmationEmail({
  to,
  orderId,
  customerName,
  total,
  items,
}: {
  to: string;
  orderId: string;
  customerName: string;
  total: number;
  items: Array<{ name: string; quantity: number; price: number }>;
}) {
  const subject = `Order Confirmed - #${orderId} | Terrace Garden Organics`;
  
  const itemsHtml = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #E6E2DA;">${item.name} (x${item.quantity})</td>
      <td style="padding: 8px; border-bottom: 1px solid #E6E2DA; text-align: right;">₹${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join('');

  const html = `
    <div style="font-family: Inter, sans-serif; background-color: #F8F6F1; padding: 24px; color: #2E2E2E;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #FCFBF8; padding: 32px; border-radius: 8px; border: 1px solid #E6E2DA;">
        <h1 style="color: #1E4D2B; font-family: 'DM Serif Display', serif; margin-bottom: 8px;">Terrace Garden Organics</h1>
        <p style="font-size: 16px; color: #4F6F52; font-weight: 500;">Hello ${customerName},</p>
        <p style="font-size: 14px; line-height: 1.5;">Thank you for returning to nature through conscious living. Your order has been confirmed successfully!</p>
        
        <div style="margin: 24px 0; padding: 16px; background-color: #F8F6F1; border-radius: 6px;">
          <h3 style="margin-top: 0; color: #6B4F3B;">Order Summary - #${orderId}</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="border-bottom: 2px solid #A6B89B;">
                <th style="padding: 8px; text-align: left;">Item</th>
                <th style="padding: 8px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr>
                <td style="padding: 8px; font-weight: bold; border-top: 2px solid #A6B89B;">Total</td>
                <td style="padding: 8px; font-weight: bold; border-top: 2px solid #A6B89B; text-align: right;">₹${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style="font-size: 12px; color: #739072; text-align: center; margin-top: 32px;">
          © 2026 Light Weight Terrace Garden. All Rights Reserved. Powerd by SURYA WORKS
        </p>
      </div>
    </div>
  `;

  if (!resend) {
    console.warn(`Resend: Mock email to ${to} for order #${orderId}`);
    return { success: true, mock: true };
  }

  try {
    const data = await resend.emails.send({
      from: 'Light Weight Terrace Garden <orders@terracegardenorganics.com>',
      to,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
