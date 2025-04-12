// app/api/khalti/initiate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const KHALTI_SECRET_KEY = 'd4de691bda4949d0bd974e24cefe9983'; // Use env variable in production

export async function POST(req: NextRequest) {
  const payload = {
    return_url: 'http://localhost:3000/protected',  // This should be your actual return URL
    website_url: 'http://localhost:3000/',
    amount: 1300,
    purchase_order_id: `order-${Date.now()}`, //Unique per request
    purchase_order_name: 'Test Purchase',
    customer_info: {
      name: 'Bimal Chalise',
      email: 'bimalcgalise123@gmail.com',
      phone: '9800000001',
    },
  };

  try {
    console.log(KHALTI_SECRET_KEY)
    const response = await axios.post(
      'https://dev.khalti.com/api/v2/epayment/initiate/', // LIVE URL (no 'dev')
      payload,
      {
        headers: {
          Authorization: `Key ${KHALTI_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const { payment_url } = response.data;
    console.log(payment_url)
    return NextResponse.json({ payment_url });
  } catch (error: any) {
    console.error('Khalti Error:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 });
  }
}
