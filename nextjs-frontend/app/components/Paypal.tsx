'use client';

import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


// This is the way of integrating paypal into the next and ts code
// client id are taken from the sandbox api credentials
// after test we can add the live client id to ensure it is a prod ready




const PayPalCheckout = () => {
  // Using state to handle client-side rendering
  const [mounted, setMounted] = useState(false);
  const ClientId = "AQjPEzcUYUkIuWpaj78ODWWTyKWXl7vmASAs17xj8Mopz8jyoog2uwaa9msPEcE_9lg9slDgcQPivWzr";

  // This ensures component only renders on client-side to prevent hydration issues


  return (
    <PayPalScriptProvider options={{ 
      clientId: ClientId // Add your client id here
    }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={async (_, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: "10.00"
                },
              },
            ],
          });
        }}
        onApprove={async (_, actions) => {
          if (!actions.order) {
            console.error("Order object is undefined");
            return;
          }
          
          const details = await actions.order.capture();
          // It is giving a success with name after the payment
          const givenName = details.payment_source?.paypal?.name?.given_name || 'customer';
          alert(`Transaction completed by ${givenName}`);
        }}
        onError={(err) => {
          console.error("PayPal Checkout Error:", err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;