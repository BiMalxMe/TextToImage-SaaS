'use client';

import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PayPalCheckout = () => {
  
  const ClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ""
  return (
    <PayPalScriptProvider options={{ clientId: ClientId }}>
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
            toast.error("Order object is undefined");
            return;
          }

          try {
            const details = await actions.order.capture();
            const givenName = details.payment_source?.paypal?.name?.given_name || 'customer';
            toast.success(`🎉 Transaction completed by ${givenName}`);
          } catch (err) {
            toast.error("Something went wrong capturing the payment.");
          }
        }}
        onError={(err) => {
          toast.error("PayPal Checkout Error: " + err.message);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
