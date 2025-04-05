// app/api/khalti/verify/route.ts

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { token, amount } = await request.json();

  try {
    const res = await fetch("https://khalti.com/api/v2/payment/verify/", {
      method: "POST",
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, amount }),
    });

    const data = await res.json();

    if (res.ok) {
      return NextResponse.json({ success: true, data });
    } else {
      return NextResponse.json({ success: false, error: data }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
