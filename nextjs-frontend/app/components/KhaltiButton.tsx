// app/components/KhaltiButton.tsx
'use client'

// @ts-ignore
import KhaltiCheckout from "khalti-checkout-web";

export default function KhaltiButton({ amount = 1000 }: { amount: number }) {
  const config = {
    publicKey: "test_public_key_dc74e0fd57cb46cd93832aee0a507256",
    productIdentity: "1234567890",
    productName: "Awesome Product",
    productUrl: "http://localhost:3000/product",
    eventHandler: {
      onSuccess(payload: any) {
        console.log("✅ Success Payload:", payload);

        // Call backend API for verification
        fetch("/api/khalti/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) alert("Payment verified!");
            else alert("Payment verification failed.");
          });
      },
      onError(error: any) {
        console.error(" Error:", error);
      },
      onClose() {
        console.log(" Checkout closed.");
      },
    },
    paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING"],
  };

  const checkout = new KhaltiCheckout(config);

  return (
    <button
      onClick={() => checkout.show({ amount })}
      className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-900 cursor-pointer"
    >
      Pay Rs.{amount / 100} with Khalti
    </button>
  );
}
